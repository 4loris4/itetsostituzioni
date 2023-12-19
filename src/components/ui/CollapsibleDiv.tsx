import AnimateHeight from "react-animate-height";

type Props = JSX.IntrinsicElements["div"] & {
  collapsed: boolean;
  duration?: number;
};

export default function CollapsibleDiv({ collapsed, duration = 200, ...props }: Props) {
  return (
    <AnimateHeight height={collapsed ? 0 : "auto"} duration={duration}>
      <div {...props} />
    </AnimateHeight>
  );
}