import { ReactNode } from 'react';
import { FloatingInput } from './FloatingInput';

export interface FormField {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  pattern?: string;
}

interface FormProps {
  fields: FormField[];
  onSubmit: () => void;
  submitText: string;
  children?: ReactNode;
  gridCols?: 1 | 2;
}

export const Form = ({ fields, onSubmit, submitText, children, gridCols = 1 }: FormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className={`grid ${gridCols === 2 ? 'md:grid-cols-2 md:gap-6' : 'grid-cols-1'}`}>
        {fields.map((field) => (
          <FloatingInput
            key={field.id}
            {...field}
          />
        ))}
      </div>
      {children}
      <button
        type="submit"
        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
      >
        {submitText}
      </button>
    </form>
  );
}; 