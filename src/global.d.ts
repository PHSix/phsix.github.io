declare module "#blogs" {
	export interface Blog {
		id: string;
		attributes: BlogAttributes;
	}

	export interface BlogAttributes {
		title: string;
		["create-time"]: string;
		tags?: string[];
	}

	declare const blogs: Blog[];

	export default blogs;
}
