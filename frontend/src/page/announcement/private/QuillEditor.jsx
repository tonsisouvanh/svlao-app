import ReactQuill from "react-quill";
const QuillEditor = ({ field, fieldState, ...props }) => {
  return (
    <div>
      <ReactQuill
        {...field}
        {...props}
        onChange={(content, delta, source, editor) => {
          field.onChange(editor.getHTML());
        }}
      />
      {fieldState.error && <span>{fieldState.error.message}</span>}
    </div>
  );
};

export default QuillEditor;
