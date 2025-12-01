"ui";
function ActivityAbout() {

    importClass(android.graphics.Color);

    importClass(android.view.View);
    StatusBarTransparency();
    activity.setTheme(com.google.android.material.R$style.Theme_Material3_Light);
    //导航栏颜色
    activity.getWindow().setNavigationBarColor(Color.parseColor("#fafafa"));
    ui.layout(
        <FrameLayout layout_width="match_parent" layout_height="match_parent" orientation="vertical" padding="0">
            <LinearLayout layout_width="match_parent" layout_height="match_parent" margin="0 0 0 0"  orientation="vertical" >
                <com.google.android.material.appbar.MaterialToolbar bg="#fafafa" layout_width="fill_parent" layout_height="wrap_content">
                    <com.google.android.material.appbar.MaterialToolbar animateLayoutChanges="true" id="toolbar" title="关于" textStyle="bold" titleTextColor="#49454F" w="*" />
                </com.google.android.material.appbar.MaterialToolbar>
                <text text="{{getAppName(activity.getPackageManager().getPackageInfo(activity.getPackageName(), 0).packageName)}}" textColor="#49454F" textStyle="bold" layout_width="wrap_content" textSize="18sp" layout_gravity="center" margin="0 50 0 0"  />
                <text text="{{app.versionName + '-' + app.versionCode}}" textColor="#49454F" textStyle="bold" layout_width="wrap_content" textSize="16sp" layout_gravity="center" margin="0 10 0 0"  />
            </LinearLayout>
            <LinearLayout layout_width="match_parent" layout_height="match_parent" orientation="vertical" gravity="center|bottom">
                <androidx.cardview.widget.CardView id="CheckUpdates" layout_gravity="center" margin="0 10 0 0" cardBackgroundColor="#00000000" cardElevation="0" cardCornerRadius="25"  contentPadding="5" foreground="?attr/selectableItemBackground" layout_width="wrap_content" layout_height="wrap_content" >
                    <horizontal layout_width="wrap_content" layout_height="wrap_content" >
                        <vertical layout_gravity="center_vertical" margin="45 5 45 5" >
                            <text text="检查更新" textStyle="bold" textColor="#49454F" textSize="15sp" layout_gravity="center_vertical" />
                        </vertical>
                    </horizontal>
                </androidx.cardview.widget.CardView>
                <androidx.cardview.widget.CardView id="feedback" layout_gravity="center" margin="0 10 0 40" cardBackgroundColor="#00000000" cardElevation="0" cardCornerRadius="25"  contentPadding="5" foreground="?attr/selectableItemBackground" layout_width="wrap_content" layout_height="wrap_content" >
                    <horizontal layout_width="wrap_content" layout_height="wrap_content" >
                        <vertical layout_gravity="center_vertical" margin="45 5 45 5" >
                            <text text="意见反馈" textStyle="bold" textColor="#49454F" textSize="15sp" layout_gravity="center_vertical" />
                        </vertical>
                    </horizontal>
                </androidx.cardview.widget.CardView>
            </LinearLayout>
        </FrameLayout>
    );
    // 配置ToolBar左上角返回按钮
    activity.setSupportActionBar(ui.toolbar);
    activity.getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    ui.toolbar.setNavigationOnClickListener(OnClickListener());
    ui.CheckUpdates.setOnClickListener(OnClickListener());
    ui.feedback.setOnClickListener(OnClickListener());
    
    
    //控件点击
    function OnClickListener() {
        return new View.OnClickListener({
            onClick: function(View) {
                //Lopv(View)
                switch (View.id) {
                    case activity.getSupportActionBar().displayHomeAsUpEnabled:

                        break;
                    default:
                        //定位返回按钮
                        if (View.iterableTextForAccessibility == "转到上一层级") {
                            activity.finish();
                        }
                        break;
                }
            }
        });
    }

    function StatusBarTransparency() {
        importClass(android.view.View);
        // 状态栏背景透明, 不加的话, 状态栏是绿色, 默认的主题色
        ui.statusBarColor(colors.TRANSPARENT);
        var SystemUiVisibility = (ve) => {
            var option =
                //View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
                (ve ? View.SYSTEM_UI_FLAG_LAYOUT_STABLE : View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
            activity.getWindow().getDecorView().setSystemUiVisibility(option);
        };
        SystemUiVisibility(false);
    }
}
ActivityAbout();