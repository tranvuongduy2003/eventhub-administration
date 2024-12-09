export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-9xl font-bold text-primary/20">404</h1>
      <h2 className="mt-8 text-3xl font-semibold tracking-tight">
        Page Not Found
      </h2>
      <p className="mt-4 text-muted-foreground">
        Sorry, we couldn't find the page you're looking for. Please check the
        URL or go back.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
      >
        Return Home
      </a>
    </div>
  );
}
