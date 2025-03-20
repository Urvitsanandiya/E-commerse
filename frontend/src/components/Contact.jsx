const Contact = () => {
  return (
    <div className="bg-white p-6 m-12  max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Our Store</h1>
      <div className="space-y-2">
        <p className="text-gray-700">54709 Willms Station</p>
        <p className="text-gray-700">Suite 350, Ahmedabad, Gujarat</p>
        <p className="text-gray-700">Tel: (415) 555-0132</p>
        <p className="text-gray-700">Email: admin@Store.com</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Careers at Forever</h2>
        <p className="text-gray-700 mb-4">
          Learn more about our teams and job openings.
        </p>
        <a
          href="#"
          className="inline-block bg-blue-100 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Explore Jobs
        </a>
      </div>
    </div>
  );
};

export default Contact;
