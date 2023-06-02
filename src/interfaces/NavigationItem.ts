export interface NavigationItem {
	active: boolean
	label: string
	path: string
	icon: JSX.Element
}

export interface NavigationItemAction extends NavigationItem {
	action: Function
}
