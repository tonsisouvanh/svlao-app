const DocumentForm = () => {
  // Example data structure with document forms
  const documentForms = [
    { name: "Admission Form", link: "/forms/admission-form.pdf" },
    { name: "Registration Form", link: "/forms/registration-form.pdf" },
    // Add more document forms as needed
  ];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-6 text-3xl font-semibold">Document Forms</h1>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {documentForms.map((form, index) => (
          <li key={index} className="rounded-md border p-4">
            <h2 className="mb-2 text-lg font-medium">{form.name}</h2>
            <a
              href={form.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Download Form
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentForm;
