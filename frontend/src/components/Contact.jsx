const Contact = () => {
  return (
    <div className="bg-gradient-to-r from-teal-50 to-gray-50 p-8 md:p-10 rounded-lg shadow-lg max-w-md mx-auto my-12">
      <h1 className="text-3xl font-bold mb-6 text-teal-800">Our Store</h1>
      <div className="space-y-3">
        <p className="text-gray-700">54709 Willms Station</p>
        <p className="text-gray-700">Suite 350, Ahmedabad, Gujarat</p>
        <p className="text-gray-700">Tel: (415) 555-0132</p>
        <p className="text-gray-700">Email: admin@Store.com</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-teal-800">
          Careers at Forever
        </h2>
        <p className="text-gray-700 mb-6">
          Learn more about our teams and job openings.
        </p>
        <a
          href="#"
          className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300"
        >
          Explore Jobs
        </a>
      </div>
    </div>
  );
};

export default Contact;