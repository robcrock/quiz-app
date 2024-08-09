import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h2>Interactive Elements</h2>
        <div className="flex flex-col">
          <div>Button</div>
          <Button>Button Idle</Button>
        </div>
      </div>
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
