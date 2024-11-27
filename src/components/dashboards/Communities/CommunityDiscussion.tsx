import { AppContext } from "@/contexts/AppContext";
import usePages from "@/hooks/usePages";
import { useContext, useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

const CommunityDiscussion = () => {
  const { loading, getPageById } = usePages();
  const { communityData } = useContext(AppContext);
  const [pagesData, setPagesData] = useState<any[]>([]);

  const pages = communityData?.pages || [];
  const communityId = communityData?.[0]?.community_id;

  useEffect(() => {
    if (pages.length > 0) {
      Promise.all(
        pages.map((pageId) => getPageById(communityId, pageId))
      ).then((data) => {
        setPagesData(data);
      });
    }
  }, [pages, getPageById, communityId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-main_blue">Community Discussion</h1>

      <div className="mt-4">
        {loading ? (
          <div className="flex items-center justify-center text-3xl">
            <ImSpinner2 className="animate-spin text-3xl" />
          </div>
        ) : pagesData.length > 0 ? (
          <div>
            {pagesData.map((page) => (
              <div key={page.page_id} className="mb-4">
                <h2 className="text-xl font-bold">{page.title} </h2>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No pages available.</p>
        )}

        <div className="mt-4 text-sm text-gray-500">
          <p>Pages count: {pages.length}</p>
          <p>Community Data count: {communityData?.length || 0}</p>
          <p>Fetched Pages Data count: {pagesData.length}</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityDiscussion;
