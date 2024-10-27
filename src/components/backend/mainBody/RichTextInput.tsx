import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import react-quill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    ['link'],                  // text direction
    
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  ]
};

const RichTextEditor = ({description,setDescription, placeholder}: {description: string, setDescription: (value: string) => void, placeholder?: string}) => {

  const handleEditorChange = (content: string) => {
    // setValue(content);
    setDescription(content);
  };

//   const handleSubmit = () => {
//     console.log("Content:", value);
//     // You can send `value` to a backend or store it
//   };

  return (
    <div className="h-[200px] dark:bg-bgDarkPrimary border-none">
      <ReactQuill
        value={description}
        onChange={handleEditorChange}
        modules={modules}
        theme="snow"
        placeholder={"This is a text"}
        className="h-[160px] placeholder:text-gray-500"
      />
    </div>
  );
};

export default RichTextEditor;
