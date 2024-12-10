import { useAnimations, useGLTF } from '@react-three/drei';
import { RootState, ThreeEvent, useThree } from '@react-three/fiber';
import CameraControls from 'camera-controls';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { AnimationAction, LoopOnce, LoopRepeat, PerspectiveCamera } from 'three';

interface EnvelopeProps {
  open: boolean;
  onActivate: () => void;
  onOpened: () => void;
}

const handlePointerOut = () => {
  document.body.style.cursor = 'auto'; // Revert cursor to default
};

const Envelope: React.FC<EnvelopeProps> = ({ open, onActivate, onOpened }) => {
  const { scene: envelope, animations } = useGLTF(process.env.NEXT_PUBLIC_ENVELOPE!);
  const { actions, mixer } = useAnimations(animations, envelope);
  const { gl, camera, controls, invalidate } = useThree<
    RootState & { camera: PerspectiveCamera; controls: CameraControls }
  >();

  useLayoutEffect(() => {
    if (open) {
      handlePointerOut();
      controls.lookInDirectionOf(0, 0.07, -0.6, true);
      actions['Armature|1_Shaking_Armature']!.stop();
      actions['Armature|2_Opened Action_Armature']!.reset().setLoop(LoopOnce, 1).fadeIn(0.2).play();
      actions['Armature|2_Opened Action_Armature']!.clampWhenFinished = true;
      const handleAnimationFinish = (event: { action: AnimationAction }) => {
        if (event.action === actions['Armature|2_Opened Action_Armature']) {
          // Switch to the idle animation
          actions['Armature|3_Opened Idle_Armature']!.reset().setLoop(LoopOnce, 1).play();
          actions['Armature|3_Opened Idle_Armature']!.clampWhenFinished = true;
          mixer.removeEventListener('finished', handleAnimationFinish);
          onOpened();
        }
      };
      mixer.addEventListener('finished', handleAnimationFinish);
    } else {
      if (actions['Armature|3_Opened Idle_Armature']!.isRunning()) {
        console.log(actions);
        actions['Armature|3_Opened Idle_Armature']!.stop();
        actions['Armature|4_Closed Action_Armature']!.reset().setLoop(LoopOnce, 1).fadeIn(0.2).play();
        actions['Armature|4_Closed Action_Armature']!.clampWhenFinished = true;
        const handleAnimationFinish = (event: { action: AnimationAction }) => {
          if (event.action === actions['Armature|4_Closed Action_Armature']) {
            actions['Armature|1_Shaking_Armature']!.reset().fadeIn(0.5).play();
            mixer.removeEventListener('finished', handleAnimationFinish);
          }
        };
        mixer.addEventListener('finished', handleAnimationFinish);
      } else {
        actions['Armature|1_Shaking_Armature']!.reset().fadeIn(0.5).play();
      }
    }
  }, [actions, controls, mixer, onOpened, open]);

  useEffect(() => {
    if (controls) {
      (window as any).envelope = envelope;
      (window as any).controls = controls;
      (window as any).invalidate = invalidate;
    }
  }, [controls, envelope, invalidate]);

  useLayoutEffect(() => {
    if (controls) {
      const fitModel = () => {
        const aspect = (controls.camera as PerspectiveCamera).aspect;
        let z;
        if (aspect >= 1) {
          z = -0.7;
        } else if (aspect >= 0.5) {
          z = -1;
        } else {
          z = -1.5;
        }
        envelope.position.setZ(z);
        controls.setPosition(-1.0496365751673938e-21, -8.81652533832276e-22, 1.726617942307035e-20);
        controls.lookInDirectionOf(0, 0.07, z);

        invalidate();
      };

      fitModel();

      window.addEventListener('resize', fitModel);

      return () => {
        window.removeEventListener('resize', fitModel);
      };
    }
  }, [controls, envelope, invalidate]);

  const handlePointerOver = useCallback(() => {
    if (!open) {
      document.body.style.cursor = 'pointer';
    }
  }, [open]);

  const handleEnvelopeClick = useCallback(
    (ev: ThreeEvent<MouseEvent>) => {
      ev.stopPropagation(); // Prevent the event from propagating to the canvas
      if (!open) {
        onActivate();
      }
    },
    [onActivate, open]
  );

  return (
    <primitive
      object={envelope}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleEnvelopeClick}
    />
  );
};

export default Envelope;
