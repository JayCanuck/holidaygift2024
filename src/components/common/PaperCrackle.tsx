import { forwardRef } from 'react';

const PaperCrackle = forwardRef<HTMLAudioElement, Omit<React.HTMLAttributes<HTMLAudioElement>, 'src'>>((props, ref) => (
  <audio ref={ref} preload='auto' src='/paper-crackle.mp3' {...props} />
));

PaperCrackle.displayName = 'PaperCrackle';

export default PaperCrackle;
