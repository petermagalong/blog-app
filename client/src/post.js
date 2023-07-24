export default function Post() {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://miro.medium.com/v2/resize:fit:2400/0*hDAyhnOx767w5qma.jpg"
          alt=""
        />
      </div>

      <div className="texts">
        <h2>Computer shop</h2>
        <p className="info">
          <span className="author">Peter magalong</span>
          <time>2023-01-06 16:45</time>
        </p>
        <p>
          Your background image for website is not just something that looks
          good. It actually affects the entire user experience. It has the
          potential to become a powerful storytelling tool that can reel your
          audience in and entice them to stick around.{" "}
        </p>
      </div>
    </div>
  );
}
