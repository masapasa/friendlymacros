function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex flex-col items-center space-x-4 sm:justify-between sm:space-x-0">
      {children}
    </div>
  );
}

export default layout;
