/// <reference types="react" />

/** Minimal fog-ui declarations used by the app. */

declare module 'fog-ui' {
	export type MenuItem = { label: string; path?: string;[key: string]: any };
	export type FormField = any;
	export type TabData = any;
	export type Column<T = any> = any;
	export type NestedConfig<T = any> = any;
	export type MetricCardData = any;
	export type chartData = any;
	export type CardItem = any;
	export type AccordionItem = any;
	export type ListItemData = any;
	export type CustomButton = any;

	export const AccordionList: any;
	export const CardListContainer: any;
	export const CardView: any;
	export const CircularProgressList: any;
	export const DataLoading: any;
	export const DataRow: any;
	export const DataTable: any;
	export const FilterFormCard: any;
	export const Form: any;
	export const GenericList: any;
	export const GenericPieChart: any;
	export const List: any;
	export const MetricCardGrid: any;
	export const NestedTable: any;
	export const NoDataTableRow: any;
	export const PageWrapper: any;
	export const PermissionCard: any;
	export const PopUpForm: any;
	export const Popup: any;
	export const SearchForm: any;
	export const TableHeader: any;
	export const Tabs: any;
	export const ThemeContext: React.Context<any>;
	export const ThemeContextProvider: React.FC<any>;
	export const Topbar: any;
	export const TrendAnalyticsChart: any;
	export type TrendAnalyticsData = any;
	export const UserGroupCard: any;
	export const colorMap: any;
	export const createFogTheme: any;

	export default {} as any;
}
