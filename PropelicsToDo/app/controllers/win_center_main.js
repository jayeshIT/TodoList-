<Alloy>
	<!-- ----------------------------------------------------------------------------
	NavigationWindow FOR IOS WITH WINDOW AND LISTVIEW
	---------------------------------------------------------------------------- -->
	<NavigationWindow id="NavigationWindow" platform="ios">
		<Window id="win_center" class="win_class">
			<LeftNavButton>
				<Button class="leftnav_btn" id="left_nav_btn" onClick="toggleDrawerLeft"/>
			</LeftNavButton>
			<RightNavButton>
				<Button class="rightnav_btn" id="right_nav_btn" onClick="add_task_function"/>
			</RightNavButton>
			
			<ListView id="all_listview" defaultItemTemplate="itemtemplate_todo" onItemclick="openEdit">
				<SearchBar />
				<Templates>
					<Require src="listview_templates/itemtemplate_todo"/>
				</Templates>
				<ListSection id="listview_section"/>
			</ListView>
		</Window>
	</NavigationWindow>
	<!-- ----------------------------------------------------------------------------
	Window FOR ANDROID  AND LISTVIEW
	---------------------------------------------------------------------------- -->
	<Window id="win_center" module="xp.ui" platform="android" class="win_class">
		<Require type="view" src="android_header" id="navBar"/>
		<ListView id="all_listview" defaultItemTemplate="itemtemplate_todo" onItemclick="openEdit">
			<SearchBar />
			<Templates>
				<Require src="listview_templates/itemtemplate_todo"/>
			</Templates>
			<ListSection id="listview_section"/>
		</ListView>
	</Window>
</Alloy>