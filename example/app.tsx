import React, { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import useScreen, { Viewports } from "../lib";

export const Tile = ({
  title,
  subtitle,
  subtitle2,
  accent,
}: {
  title: ReactNode;
  subtitle: ReactNode;
  accent: string;
  subtitle2?: ReactNode;
}) => (
  <div className="tile is-parent">
    <article className={`tile is-child notification ${accent}`}>
      <div className="content">
        <p className="title has-text-centered">{title}</p>
        <p className="subtitle has-text-centered">{subtitle}</p>
        {subtitle2 && <p className="are-medium has-text-centered">{subtitle2}</p>}
      </div>
    </article>
  </div>
);

export default function App() {
  const { screenWidth, screenHeight, isMobile, isTablet, isComputer, isLargeScreen, isWideScreen } = useScreen();
  return (
    <>
      <div className="hero is-info">
        <div className="container">
          <h1 className="is-size-1 has-text-centered">useScreen</h1>
          <p className="is-size-6 has-text-centered">Custom React hook for screen and device information</p>
          <br />
          <div className="has-text-centered">
            <iframe
              src="https://ghbtns.com/github-btn.html?user=alioguzhan&repo=use-screen&type=star&count=true&v=2&size=large"
              frameBorder="0"
              scrolling="0"
              width="170"
              height="30"
              title="GitHub"
            ></iframe>
          </div>
          <br />
        </div>
      </div>
      <div className="container pt-5">
        <p className="is-size-3 has-text-centered">Resize the window to see it in action.</p>
        <br />
        <div className="tile is-ancestor">
          <div className="tile">
            <Tile title={`${screenWidth}px`} subtitle="Screen Width" accent="is-info" />
            <Tile title={`${screenHeight}px`} subtitle="Screen Height" accent="is-warning" />
          </div>
        </div>
        <br />
        <div className="tile is-ancestor">
          <Tile
            title={isMobile ? "Yes" : "No"}
            subtitle="Is Mobile"
            accent={isMobile ? "is-success" : "is-default"}
            subtitle2={<small>{JSON.stringify(Viewports.mobile, null, 2)}</small>}
          />
          <Tile
            title={isTablet ? "Yes" : "No"}
            subtitle="Is Tablet"
            accent={isTablet ? "is-success" : "is-default"}
            subtitle2={<small>{JSON.stringify(Viewports.tablet, null, 2)}</small>}
          />
          <Tile
            title={isComputer ? "Yes" : "No"}
            subtitle="Is Computer"
            accent={isComputer ? "is-success" : "is-default"}
            subtitle2={<small>{JSON.stringify(Viewports.computer, null, 2)}</small>}
          />
          <Tile
            title={isLargeScreen ? "Yes" : "No"}
            subtitle="Is Large Screen"
            accent={isLargeScreen ? "is-success" : "is-default"}
            subtitle2={<small>{JSON.stringify(Viewports.largeScreen, null, 2)}</small>}
          />
          <Tile
            title={isWideScreen ? "Yes" : "No"}
            subtitle="Is Wide Screen"
            accent={isWideScreen ? "is-success" : "is-default"}
            subtitle2={<small>{JSON.stringify(Viewports.wideScreen, null, 2)}</small>}
          />
        </div>
        <br />
        <p>Install:</p>
        <br />
        <pre>npm install use-screen</pre>
        <br />
        <p>Usage: </p>
        <br />
        <pre>
          {`import useScreen from "use-screen";\n\nconst { screenWidth, screenHeight, isMobile, isTablet, isComputer, isLargeScreen, isWideScreen } = useScreen();`}
        </pre>
        <br />
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
createRoot(rootElement!).render(<App />);
