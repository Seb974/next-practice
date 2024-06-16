
export default function Layout({children}: { children: React.ReactNode }) {
  return (  
    <div className="flex justify-center">
      <div className="flex-grow max-w-screen-sm p-6 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  );
}