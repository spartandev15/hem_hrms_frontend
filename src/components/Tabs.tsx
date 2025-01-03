import React, { useState } from "react";
import "../assets/styles/tabs.css";

interface TabContainerProps {
  children: React.ReactNode;
  defaultValue?: number;
}

interface TabProps {
  label: string;
  children: React.ReactNode;
}

export const Tabs = ({ children }: TabProps) => {
  const renderedChildren =
    typeof children === "string" ? <div>{children}</div> : children;
  return <div>{renderedChildren}</div>;
};

const TabContainer = ({ children, defaultValue = 0 }: TabContainerProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultValue);
  const Tabs = React.Children.toArray(children);
  return (
    <div className="tabs-container">
      {/* Tabs Header  */}
      <div className="tabs-header">
        {Tabs.map((item, index) => (
          <button
            key={`${(item as React.ReactElement)?.props?.label}-${index}`}
            onClick={() => setActiveIndex(index)}
            className={`${activeIndex == index && "active-tab"}`}
          >
            {(item as React.ReactElement).props?.label}
          </button>
        ))}
      </div>

      {/* Render tabs content  */}
      <div>{(Tabs[activeIndex] as React.ReactElement).props?.children}</div>
    </div>
  );
};

export default TabContainer;
