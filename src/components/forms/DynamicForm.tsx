import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import clsx from "clsx";
import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { AppContext } from "@/contexts/AppContext";

interface Field {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'file' | 'select' | 'textarea' | 'checkbox' | 'number';
  options?: string[];
  required?: boolean;
}

interface DynamicFormProps {
  fields: Field[];
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, initialValues, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialValues || {},
  });
  const { setIsAdding, setIsEditing } = useContext(AppContext);

  const [isFormVisible, setIsFormVisible] = useState(true);

  const submitHandler: SubmitHandler<Record<string, any>> = async (data) => {
    await onSubmit(data);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setIsAdding(false);
    setIsEditing(false);
  };

  return (
    <>
      {isFormVisible && (
        <div className="relative p-4 rounded-lg bg-white shadow-lg">
          <button
            type="button"
            onClick={closeForm}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>

          <form onSubmit={handleSubmit(submitHandler)} className="gap-2">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col mb-2">
                <label className="font-semibold text-main_blue">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    {...register(field.name, { required: field.required })}
                    className={clsx('input', errors[field.name] && 'border-red-500')}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    {...register(field.name, { required: field.required })}
                    className={clsx('textarea', errors[field.name] && 'border-red-500')}
                  />
                ) : field.type === 'checkbox' ? (
                  <div className="flex items-center">
                    <input
                      {...register(field.name, { required: field.required })}
                      type="checkbox"
                      className={clsx('checkbox', errors[field.name] && 'border-red-500')}
                    />
                    <span className="ml-2">{field.label}</span>
                  </div>
                ) : (
                  <Input
                    {...register(field.name, { required: field.required })}
                    type={field.type}
                    className={clsx('input', errors[field.name] && 'border-red-500')}
                  />
                )}
                {errors[field.name] && (
                  <p className="text-red-500 text-sm">This field is required</p>
                )}
              </div>
            ))}
            <Button type="submit" className="bg-main_blue text-white hover:bg-white hover:text-main_blue hover:border hover:border-main_blue">
              Submit
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default DynamicForm;
