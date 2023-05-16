interface ButtonProps {
  title: string
}

export default function Button(props: ButtonProps) {
  return (
    <div>
      <button>{props.title}</button>
    </div>
  )
}