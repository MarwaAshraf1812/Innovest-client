import Pagination from "@/components/common/Pagination/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppContext } from "@/contexts/AppContext";
import useCommunity from "@/hooks/useCommunity";
import { useContext, useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import io from "socket.io-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const socket = io("http://127.0.0.1:5000");

const CommunitiesList = () => {
  const { fetchCommunities, loading, communities } = useCommunity();
  const [currentPage, setCurrentPage] = useState(1);
  const { userData, pendingRequests, setPendingRequests, setCommunityData } = useContext(AppContext);
  const navigate = useNavigate();
  const pageSize = 4;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleJoinCommunity = async (communityId: string) => {
    const community = communities.find(c => c.community_id === communityId);
    if (community) {
      setCommunityData([community]);
    }

    if (community && userData?.id && community.users.includes(userData.id)) {
      navigate(`${communityId}/discussion`);
    } else {
      socket.emit("joinCommunity", communityId, userData?.id);
      setPendingRequests([...pendingRequests, communityId]);
      toast.info("Your request is pending approval.", { position: "top-right" });
    }
  };

  useEffect(() => {
    fetchCommunities();

    socket.on("connect", () => {
      console.log("Connected to socket server!");
    });

    socket.on("error", (errorMessage) => {
      console.error("Socket Error:", errorMessage);
      alert(errorMessage);
    });

    socket.on("joinRequestPending", (message: string) => {
      toast.info(message, { position: "top-right" });
    });

    socket.on("alreadyMember", (message: string) => {
      toast.warning(message, { position: "top-right" });
    });

    return () => {
      socket.off("joinRequestPending");
      socket.off("alreadyMember");
      socket.off("connect");
      socket.off("error");
    };
  }, [pendingRequests]);

  if (loading) {
    return (
      <div className="flex items-center justify-center text-3xl">
        <ImSpinner2 className="animate-spin text-3xl" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Communities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {communities?.map((community) => (
          <Card key={community.community_id} className="p-4 shadow-md">
            <CardHeader>
              <CardTitle className="text-main_blue">{community.community_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{community.description}</p>
              <p className="mt-2 text-sm font-semibold">{community.member_count} members</p>
              <Button
                onClick={() => handleJoinCommunity(community.community_id)}
                disabled={pendingRequests.includes(community.community_id)}
                className={`mt-4 ${
                  userData?.id && community.users.includes(userData.id)
                    ? "bg-green-500"
                    : "bg-main_blue"
                } text-white hover:bg-white hover:text-main_blue hover:border-main_blue`}
              >
                {userData?.id && community.users.includes(userData.id)
                  ? "View"
                  : pendingRequests.includes(community.community_id)
                  ? "Pending Approval"
                  : "Join"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={communities?.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CommunitiesList;
