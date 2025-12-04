export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 mt-10 border-t-2 border-[#333] bg-[#111] text-center font-mono">
      <div className="text-gray-500 text-xs md:text-sm">
        <p className="mb-2">
          &copy; {year} <span className="text-white font-bold">STEM INSIGHT</span>. All Rights Reserved.
        </p>
        <p className="scale-90 opacity-60">
          Unauthorized reproduction or distribution of this software is strictly prohibited.
          <br />
          Proprietary MVP Demo - Internal Use Only.
        </p>
      </div>
    </footer>
  );
}