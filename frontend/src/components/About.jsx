const About = () => {
  return (
    <div className="bg-gradient-to-r from-teal-50 to-gray-50 p-6 md:p-10 rounded-lg shadow-lg max-w-2xl mx-auto my-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-teal-800">
        About Store
      </h1>
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Store was born out of a passion for innovation and a desire to
          revolutionize the way people shop online. Our journey began with a
          simple idea: to provide a platform where customers can easily
          discover, explore, and purchase a wide range of products from the
          comfort of their homes.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Since our inception, we’ve worked tirelessly to curate a diverse
          selection of high-quality products that cater to every taste and
          preference. From fashion and beauty to electronics and home
          essentials, we offer an extensive collection sourced from trusted
          brands and suppliers.
        </p>
      </div>
      <div className="mt-10">
        <h2 className="text-3xl font-semibold mb-6 text-teal-800">
          Our Mission
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Our mission at Store is to empower customers with choice, convenience,
          and confidence. We’re dedicated to providing a seamless shopping
          experience that exceeds expectations, from browsing and ordering to
          delivery and beyond.
        </p>
      </div>
    </div>
  );
};

export default About;