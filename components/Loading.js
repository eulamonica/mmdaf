
import useTheme from "@/hooks/useTheme";

const Loading = ({ text }) => {
  const [theme,] = useTheme();
  return (
    <div data-theme={theme}>
      <progress className='rounded-none fixed top-0 left-0 progress progress-primary z-50 w-full shadow-md'>Loading {text}...</progress>
    </div>
  );
};

export default Loading;