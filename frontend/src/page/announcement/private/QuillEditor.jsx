import ReactQuill from "react-quill";
const QuillEditor = ({ field, fieldState, ...props }) => {
  //TODO: continue working on react quill
  return (
    <div>
      <ReactQuill
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["link","image"],
          ],
        }}
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
