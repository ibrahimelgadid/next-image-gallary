import Layouts from "@/components/Layouts";
import "@/styles/globals.css";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function App({ Component, pageProps }) {
  return (
    <Layouts>
      <Component {...pageProps} />
    </Layouts>
  );
}
