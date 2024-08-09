export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {/* <!-- Quiz menu start --> */}
        Welcome to the Frontend Quiz! Pick a subject to get started. HTML CSS
        JavaScript Accessibility
        {/* <!-- Quiz menu end --> */}
        {/* <!-- Quiz question start --> */}
        {/* Question <!-- number --> of 10 */}A B C D Submit answer
        {/* <!-- Quiz question end --> */}
        {/* <!-- Quiz completed start --> */}
        Quiz completed You scored...
        {/* <!-- score --> out of 10 */}
        {/* <!-- Quiz completed end --> */}
      </div>
    </main>
  );
}
