import { useEffect } from "react";
import "./popup.css";

export const Popup = () => {
  useEffect(() => chrome.storage.local.get("originalCsv", (data) => console.log(data)), []);
  return <div>popup</div>;
};
