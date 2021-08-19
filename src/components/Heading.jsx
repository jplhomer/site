export default function Heading({children, className}) {
  return (
    <h1
      className={`text-4xl leading-10 font-extrabold text-gray-900 dark:text-gray-200 ${className}`}
    >
      {children}
    </h1>
  );
}
