const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 bg-white rounded-lg shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-2xl mx-auto h-14">
        <hr className="w-full border-gray-200 sm:mx-auto dark:border-gray-700" />
        <span className="block text-sm sm:items-center sm:text-center text-gray-500 my-4">
          © 2023 <a className="hover:underline">Blogger™</a>. All Rights
          Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
