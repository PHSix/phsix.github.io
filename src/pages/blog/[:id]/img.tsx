export default function InternalImg(props: {
	className?: string;
	alt?: string;
	src?: string;
	title?: string;
}) {
	if (props.src?.startsWith("/public/images")) {
		props.src = props.src.slice(7);
	}
	return <img {...props}></img>;
}
