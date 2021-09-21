interface IComponentProps {
  children: JSX.Element | string;
}

export type IComponent = (props: IComponentProps) => JSX.Element;
