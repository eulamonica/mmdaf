import { useRouter } from 'next/router';

const Loading = ({ text }) => {

  return (
    <div >
      <progress className='fixed top-0 left-0 progress progress-primary z-50 w-full shadow-md'>Loading {text}...</progress>
    </div>
  );
};

export default Loading;