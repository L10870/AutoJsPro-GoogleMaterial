//控件状态改变
function OnCheckedChangeListener() {
    return new CompoundButton.OnCheckedChangeListener({
        onCheckedChanged: function(view, checked) {
            if (!view.isPressed()) {
                return;
            }
            switch (view.id) {
                //稳定模式按钮
                case ui.stable_mode.id:
                    if (checked) {
                        $settings.setEnabled('stable_mode', true);
                        break;
                    }
                    $settings.setEnabled('stable_mode', false);
                    break;
                    //音量上键停止所有脚本按钮
                case ui.stop_all_on_volume_up.id:
                    if (checked) {
                        $settings.setEnabled('stop_all_on_volume_up', true);
                        break;
                    }
                    $settings.setEnabled('stop_all_on_volume_up', false);
                    break;
                    //启动时不显示日志界面按钮
                case ui.not_show_console.id:
                    if (checked) {
                        $settings.setEnabled('not_show_console', true);
                        break;
                    }
                    $settings.setEnabled('not_show_console', false);
                    break;
                    //前台服务按钮
                case ui.foreground_service.id:
                    if (checked) {
                        $settings.setEnabled('foreground_service', true);
                        break;
                    }
                    $settings.setEnabled('foreground_service', false);
                    break;
                case ui.AccessibilityPermissions.id:
                    if (GetAccessible()) {
                        ui.AccessibilityPermissions.setChecked(true);
                        Snackbar.make(ui.CoordinatorLayout, "无障碍服务已启动！", Snackbar.LENGTH_SHORT)
                            .show();
                        return;
                    }
                    ui.AccessibilityPermissions.setChecked(true);
                    try {
                        app.startActivity({
                            action: "android.settings.ACCESSIBILITY_SETTINGS",
                        });
                    } catch (error) {
                        Snackbar.make(ui.CoordinatorLayout, "当前设备不支持跳转设置,请手动开启权限!", Snackbar.LENGTH_SHORT)
                            .show();
                    }
                    break;
                case ui.FloatingWindowPWPermissions.id:
                    if (DetermineWindowPermissions()) {
                        ui.FloatingWindowPWPermissions.setChecked(true);
                        Snackbar.make(ui.CoordinatorLayout, "悬浮窗权限已获取！", Snackbar.LENGTH_SHORT)
                            .show();
                        return;
                    }
                    ui.FloatingWindowPWPermissions.setChecked(true);
                    try {
                        app.startActivity({
                            action: "android.settings.action.MANAGE_OVERLAY_PERMISSION",
                        });
                    } catch (error) {
                        Snackbar.make(ui.CoordinatorLayout, "当前设备不支持跳转设置,请手动开启权限!", Snackbar.LENGTH_SHORT)
                            .show();
                    }
                    break;
            }
        }
    });
}



//控件点击
function OnClickListener() {
    return new View.OnClickListener({
        onClick: function(view) {
            switch (view.id) {
                case ui.ShapeableImageViewButton.id:
                    var popupMenu = new androidx.appcompat.widget.PopupMenu(activity, ui.ShapeableImageViewButton);
                    //log(popupMenu.setPopupBackground)
                    var menu = popupMenu.getMenu();
                    menu.add("从剪贴板导入");
                    menu.add("打开文件");
                    //log(menu.setPopupBackground)
                    popupMenu.setOnMenuItemClickListener(new androidx.appcompat.widget.PopupMenu.OnMenuItemClickListener({
                        onMenuItemClick: function(item) {
                            switch (item.getTitle()) {
                                case "打开文件":
                                    var FileManagement = new ModuleClass.SystemFileManagement();
                                    //非阻塞函数
                                    FileManagement.OpenPath("/脚本/", "text/*", function(FilePath) {
                                        Snackbar.make(ui.CoordinatorLayout, FilePath, Snackbar.LENGTH_SHORT)
                                            .show()
                                    });
                                    break;
                                case "从剪贴板导入":
                                    //插入一条数据
                                    items.splice(1, 0, {
                                        "Account": RandomName(),
                                        "Password": RandomChar(10, 12)
                                    });
                                    break;
                                default:
                                    Snackbar.make(ui.CoordinatorLayout, item.getTitle(), Snackbar.LENGTH_SHORT)
                                        .show();
                                    break;
                            }
                            return true;
                        }
                    }));
                    popupMenu.show();
                    break;
                case ui.ShapeableImageViewButton_A.id:
                    Snackbar.make(ui.CoordinatorLayout, "分享", Snackbar.LENGTH_SHORT)
                        .show();
                    break;
                case ui.HomeButton.id:
                    Snackbar.make(ui.CoordinatorLayout, "HomeButton", Snackbar.LENGTH_SHORT)
                        .show();
                    break;
                case ui.ThemeColors.id:
                    var Color = [{
                        color: "#F8C3CD",
                        name: "退红"
                    }, {
                        color: "#FFC408",
                        name: "籐黄"
                    }, {
                        color: "#58B2DC",
                        name: "天蓝"
                    }, {
                        color: "#7DB9DE",
                        name: "勿忘草"
                    }, {
                        color: "#005CAF",
                        name: "琉璃"
                    }, {
                        color: "#7B90D2",
                        name: "红碧"
                    }, {
                        color: "#080808",
                        name: "黑"
                    }, {
                        color: "#562E37",
                        name: "似紫"
                    }, {
                        color: "#9B6E23",
                        name: "狐"
                    }, {
                        color: "#F05E1C",
                        name: "黄丹"
                    }];
                    var popupMenu = new androidx.appcompat.widget.PopupMenu(activity, ui.ThemeColorsText);
                    var menu = popupMenu.getMenu();
                    for (var i = 0; i < Color.length; i++) {
                        menu.add(Color[i].name);
                    }
                    popupMenu.setOnMenuItemClickListener(new androidx.appcompat.widget.PopupMenu.OnMenuItemClickListener({
                        onMenuItemClick: function(item) {
                            for (var i = 0; i < Color.length; i++) {
                                if (Color[i].name == item.getTitle()) {
                                    ThemeColors = Color[i].color;
                                    break;
                                }
                            }
                            Storage.put("ThemeColors", ThemeColors);
                            ActivityMain();
                            return true;
                        }
                    }));
                    popupMenu.show();
                    break;
                case ui.StartButton.id:
                    /*
                    if (!GetAccessible()) {
                        Snackbar.make(ui.CoordinatorLayout, "需要给予无障碍权限", Snackbar.LENGTH_SHORT)
                            .show();
                        return 0;
                    }*/
                    if (!DetermineWindowPermissions()) {
                        Snackbar.make(ui.CoordinatorLayout, "需要给予悬浮窗权限", Snackbar.LENGTH_SHORT)
                            .show();
                        return 0;
                    }
                    let getIcon = ui.StartButton.attr("src");
                    let itemColor = [
                        [ThemeColors, "#FFFFFFFF"],
                        ["#ff5722", "#FFFFFFFF"]
                    ]
                    let itemIcon = ["@drawable/ic_play_arrow_black_48dp", "@drawable/ic_stop_black_48dp"];
                    let setIcon = itemIcon[getIcon == itemIcon[0] ? 1 : 0];
                    ui.StartButton.attr("src", setIcon);
                    ui.StartButton.attr("backgroundTint", itemColor[getIcon == itemIcon[0] ? 1 : 0][0]);
                    ui.StartButton.attr("tint", itemColor[getIcon == itemIcon[0] ? 1 : 0][1]);
                    if (getIcon == itemIcon[0] ? 1 : 0) {
                        isRun = threads.start(function() {
                            Main();
                        })
                    } else {
                        if (isRun) {
                            try {
                                FloatyLog.Stop();
                            } catch (e) {}
                            threads.shutDownAll();
                        }
                    }
                    break;
                case ui.ListButton.id:
                    let item = itemHolder.item;
                    Snackbar.make(ui.CoordinatorLayout, item, Snackbar.LENGTH_SHORT)
                        .show();

                    break;
                case ui.Donation.id:
                    if (ui.DonationChildLayout.visibility == 8) {
                        /*
                            var AnimatSet = new AnimationSet(true);
                            var Animation = new AlphaAnimation(0, 1);
                            Animation.setDuration(250);
                            AnimatSet.addAnimation(Animation);
                            Animation = new TranslateAnimation(Animation.RELATIVE_TO_SELF, 1, Animation.RELATIVE_TO_SELF, 0, Animation.RELATIVE_TO_SELF, 0, Animation.RELATIVE_TO_SELF, 0);
                            Animation.setDuration(250);
                            AnimatSet.addAnimation(Animation);
                            var controller = new LayoutAnimationController(AnimatSet, 0.25);
                            ui.DonationChildLayout.setLayoutAnimation(controller);
                            */
                        var DonationHidght_Start = ControlClass.getViewHeight(ui.Donation, true);
                        ui.DonationChildLayout.attr('visibility', 'visible');
                        var DonationHidght = ControlClass.getViewHeight(ui.Donation, true);
                        ui.DonationChildLayout.attr('visibility', 'gone');
                        var animator = ObjectAnimator.ofFloat(ui.DonationChildLayout, "alpha", DonationHidght_Start, DonationHidght);
                        //var animator = ObjectAnimator.ofFloat(ui.HomeButton, "alpha", 287, 504);
                        animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener({
                            onAnimationUpdate: function(animation) {
                                var params = ui.Donation.getLayoutParams();
                                params.height = animation.getAnimatedValue();
                                ui.Donation.setLayoutParams(params);
                            }
                        }));
                        var animator_A = ObjectAnimator.ofFloat(ui.DonationChildLayout, "alpha", 0, 0.5, 0.5, 1);
                        var animator_B = ObjectAnimator.ofFloat(ui.DonationChildLayout, "translationX", 200, 0);
                        var set = new AnimatorSet();
                        set.playTogether(animator, animator_A, animator_B);
                        set.setDuration(300); //动画时间
                        set.start();
                        ui.DonationChildLayout.attr('visibility', 'visible');
                        break;
                    }

                    var DonationHidght_Start = ControlClass.getViewHeight(ui.Donation, true);
                    ui.DonationChildLayout.attr('visibility', 'gone');
                    var DonationHidght = ControlClass.getViewHeight(ui.Donation, true);
                    ui.DonationChildLayout.attr('visibility', 'visible');
                    var animator = ObjectAnimator.ofFloat(ui.DonationChildLayout, "alpha", DonationHidght_Start, DonationHidght);
                    animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener({
                        onAnimationUpdate: function(animation) {
                            var params = ui.Donation.getLayoutParams();
                            params.height = animation.getAnimatedValue();
                            ui.Donation.setLayoutParams(params);
                        }
                    }));
                    animator.addListener(new AnimatorListenerAdapter({
                        onAnimationEnd: function(animation) {
                            ui.DonationChildLayout.attr('visibility', 'gone');
                        }
                    }));
                    var animator_A = ObjectAnimator.ofFloat(ui.DonationChildLayout, "alpha", 1, 0.5, 0.1, 0);
                    var animator_B = ObjectAnimator.ofFloat(ui.DonationChildLayout, "translationX", 0, 200);

                    var set = new AnimatorSet();
                    set.playTogether(animator, animator_A, animator_B);
                    set.setDuration(300); //动画时间
                    set.start();
                    break;
                case ui.About.id:
                    engines.execScriptFile("AboutActivity.js");
                    break;
                case ui.LogTheme.id:
                    function GetLogDiaLogLayout() {
                        return ui.inflate(files.read("src/layout/activity_Dialog_Log.xml"));
                    }

                    function BuildMessageView(ParentView) {
                        return ui.inflate(files.read("src/layout/activity_Message.xml"), ParentView);
                    }

                    function DialogOnChangeListener() {
                        return new Slider.OnChangeListener({
                            //状态变化后监听
                            onValueChange: function(slider, value, fromUser) {
                                //控件变化
                                switch (slider.id) {
                                    //透明度
                                    case DiaLogLayout.transparency.id:
                                        DiaLogLayout.MessageLayout.setAlpha(slider.getValue());
                                        LayoutAlpha = slider.getValue();
                                        break;
                                        //消息最大数量
                                    case DiaLogLayout.messageMax.id:
                                        MaxMessage = slider.getValue();
                                        break;
                                        //动画时间
                                    case DiaLogLayout.messageAnimation.id:
                                        MessageStartAnimation = slider.getValue();
                                        break;
                                }
                                //toast(slider.getValue());
                            }
                        });
                    }
                    /*
                        function DialogOnSliderTouchListener() {
                            return new Slider.OnSliderTouchListener({
                                onStartTrackingTouch: function(slider) {
                                    //控件变化
                                    //toast(slider.getValue());
                                },
                                onStopTrackingTouch: function(slider) {
                                    toast(slider.getValue());
                                }
                            });
                        }
                        */
                    function DialogOnClickListener() {
                        return new View.OnClickListener({
                            onClick: function(View) {
                                //Lopv(View)
                                switch (View.id) {
                                    //确认
                                    case DiaLogLayout.affirm.id:
                                        Storage.put("MessageStartAnimation", MessageStartAnimation);
                                        Storage.put("LayoutAlpha", LayoutAlpha);
                                        Storage.put("MaxMessage", MaxMessage);
                                        Storage.put("BackgroundColors", BackgroundColors);
                                        Storage.put("isMessageTime", isMessageTime);
                                        setTimeout(function() {
                                            Dialog.dismiss();
                                        }, 200);
                                        break;
                                        //取消
                                    case DiaLogLayout.cancel.id:
                                        setTimeout(function() {
                                            Dialog.dismiss();
                                        }, 200);
                                        break;
                                        //添加颜色
                                    case DiaLogLayout.addColor.id:
                                        var ColorList = BackgroundColors;
                                        var ColorText = DiaLogLayout.colorEdit.text;
                                        if (ModuleClass.AttrJudgment(ColorList, ColorText)) {
                                            DiaLogLayout.ErrorEditLayout.setError("已经存在相同颜色！");
                                            return 0;
                                        }
                                        try {
                                            colors.parseColor(ColorText);
                                            BackgroundColors[BackgroundColors.length] = ColorText + "";
                                            MessageLayoutinit(DiaLogLayout, BackgroundColors);
                                        } catch (e) {
                                            DiaLogLayout.ErrorEditLayout.setError("颜色识别失败！");
                                            return 0;
                                        }
                                        break;
                                }
                            }
                        });
                    }
                    //控件状态改变
                    function DialogOnCheckedChangeListener() {
                        return new CompoundButton.OnCheckedChangeListener({
                            onCheckedChanged: function(view, checked) {
                                switch (view.id) {
                                    //稳定模式按钮
                                    case DiaLogLayout.isMessageTime.id:
                                        if (checked) {
                                            isMessageTime = true;
                                            MessageLayoutinit(DiaLogLayout, BackgroundColors);
                                            break;
                                        }
                                        isMessageTime = false;
                                        MessageLayoutinit(DiaLogLayout, BackgroundColors);
                                        break;
                                }
                            }
                        });
                    }

                    function MessageLayoutinit(DiaLogLayout, BackgroundColors) {
                        if (isDialog == false) {
                            addMessageView();
                            StopAnimator();
                            return 0;
                        }
                        var animator_A = ObjectAnimator.ofFloat(DiaLogLayout.MessageLayout, "alpha", 1, 0);
                        var animator_B = ObjectAnimator.ofFloat(DiaLogLayout.chipGroup_Color, "alpha", 1, 0);
                        animator_A.addListener(new AnimatorListenerAdapter({
                            onAnimationEnd: function(animation) {
                                DiaLogLayout.MessageLayout.attr('visibility', 'gone');
                                DiaLogLayout.MessageLayout.removeAllViews();
                                DiaLogLayout.chipGroup_Color.removeAllViews();
                                addMessageView();
                                StopAnimator();
                            }
                        }));
                        var set = new AnimatorSet();
                        set.playTogether(animator_A, animator_B);
                        set.setDuration(MessageStartAnimation); //动画时间
                        set.start();

                        function BuildChipGroup_Color(Colors) {
                            var view = new com.google.android.material.chip.Chip(activity);
                            //设置文字
                            view.setText(Colors);
                            //设置是否可选中
                            //view.setCheckable(true);
                            //设置边线宽度 
                            //view.setChipStrokeWidth(0);
                            //设置边线颜色 
                            view.setChipStrokeColor(ColorStateList.valueOf(android.graphics.Color.parseColor("#49454F")));
                            //水波纹颜色
                            view.setRippleColor(ColorStateList.valueOf(android.graphics.Color.parseColor("#EEE8F4")));
                            //设置文字颜色
                            view.setTextColor(ColorStateList.valueOf(android.graphics.Color.parseColor("#EEE8F4")));
                            //设置背景颜色
                            view.setChipBackgroundColor(ColorStateList.valueOf(android.graphics.Color.parseColor(Colors)));
                            //前面图标着色
                            //view.setChipIconTint(ColorStateList.valueOf(android.graphics.Color.parseColor("#CA7A2C")));
                            //后面图标着色
                            view.setCloseIconTint(ColorStateList.valueOf(android.graphics.Color.parseColor("#49454F")));
                            //设置选中后的图标
                            view.setCheckedIcon(context.getResources().getDrawable(ui.R.drawable.ic_done_all_black_48dp));
                            //设置选中后是否出现选中图标
                            view.setCheckedIconEnabled(true);
                            //设置删除图标
                            view.setCloseIcon(context.getResources().getDrawable(ui.R.drawable.ic_cancel_black_48dp));
                            //设置删除图标是否显示
                            //view.setCloseIconEnabled(true);
                            //关闭按钮的点击监听——closeIcon 没有id，所以必须需要构造匿名监听
                            view.setOnCloseIconClickListener(new View.OnClickListener({
                                onClick: function(View) {
                                    var ColorList = [];
                                    for (var i = 0; i < BackgroundColors.length; i++) {
                                        if (View.text == BackgroundColors[i]) {
                                            continue;
                                        }
                                        ColorList[ColorList.length] = BackgroundColors[i];
                                    }
                                    BackgroundColors = ColorList;
                                    MessageLayoutinit(DiaLogLayout, ColorList);
                                }
                            }));
                            //点击监听
                            view.setOnClickListener(new View.OnClickListener({
                                onClick: function(View) {
                                    var Colors = View.text;
                                    for (var i = 0; i < BackgroundColors.length; i++) {
                                        if (Colors == BackgroundColors[i]) {
                                            var op = BackgroundColors[0];
                                            BackgroundColors[i] = op;
                                            BackgroundColors[0] = Colors;
                                        }
                                    }
                                    MessageLayoutinit(DiaLogLayout, BackgroundColors);
                                }
                            }));
                            //长按监听
                            view.setOnLongClickListener(new View.OnLongClickListener({
                                onLongClick: function(View) {
                                    if (BackgroundColors.length == 1) {
                                        return true;
                                    }
                                    if (!View.closeIconEnabled) {
                                        View.setCloseIconEnabled(true);
                                        return true;
                                    }
                                    View.setCloseIconEnabled(false);
                                    return true;
                                }
                            }));
                            return view;
                        }

                        function addMessageView() {
                            for (var i = 0; i < BackgroundColors.length; i++) {
                                var MessageView = BuildMessageView(DiaLogLayout.Layout);
                                //设置消息
                                MessageView.Text.setText(ModuleClass.randomRange(1, 60));
                                //设置时间
                                MessageView.Time.setText(dateFormat(new Date(), "HH:mm:ss"));
                                //判断是否关闭时间显示
                                if (!isMessageTime) {
                                    MessageView.Time.attr('visibility', 'gone');
                                }
                                //设置控件显示
                                MessageView.setCardBackgroundColor(colors.parseColor(BackgroundColors[i]));
                                //添加控件
                                if (i < 5) {
                                    DiaLogLayout.MessageLayout.addView(MessageView);
                                }
                                DiaLogLayout.chipGroup_Color.addView(BuildChipGroup_Color(BackgroundColors[i]));
                            }
                        }

                        function StopAnimator() {
                            var animator_A = ObjectAnimator.ofFloat(DiaLogLayout.MessageLayout, "alpha", 0, LayoutAlpha);
                            var animator_B = ObjectAnimator.ofFloat(DiaLogLayout.MessageLayout, "translationX", device.width / 4, 0);
                            var animator_C = ObjectAnimator.ofFloat(DiaLogLayout.chipGroup_Color, "alpha", 0, 1);
                            var animator_D = ObjectAnimator.ofFloat(DiaLogLayout.chipGroup_Color, "translationX", device.width / 4, 0);
                            var set = new AnimatorSet();
                            set.playTogether(animator_A, animator_B, animator_C, animator_D);
                            set.setDuration(MessageStartAnimation); //动画时间
                            set.start();
                            DiaLogLayout.MessageLayout.attr('visibility', 'visible');
                        }
                    }
                    //动画时间
                    var MessageStartAnimation = Storage.get("MessageStartAnimation") || 100;
                    //开启动画
                    var isAnimation = true;
                    //最高容纳几个消息
                    var MaxMessage = Storage.get("MaxMessage") || 10;
                    //消息颜色
                    var BackgroundColors = Storage.get("BackgroundColors") || [
                        "#F75C2F",
                        "#9B6E23",
                        "#FB9966",
                        "#FFB11B",
                        "#DDD23B",
                        "#1E88A8",
                        "#005CAF",
                        "#C1328E",
                        "#8E354A",
                        "#8D742A"
                    ];
                    //悬浮窗透明度
                    var LayoutAlpha = Storage.get("LayoutAlpha") || 1;
                    //toast(LayoutAlpha)
                    //是否开启消息时间
                    var isMessageTime = Storage.get("isMessageTime") && true;
                    if (!isMessageTime)
                        isMessageTime = false;
                    else
                        isMessageTime = true;
                    var isDialog = false;
                    //对话框界面
                    var DiaLogLayout = GetLogDiaLogLayout();
                    DiaLogLayout.transparency.setValue(LayoutAlpha);
                    DiaLogLayout.messageMax.setValue(MaxMessage);
                    DiaLogLayout.MessageLayout.setAlpha(LayoutAlpha);
                    DiaLogLayout.messageAnimation.setValue(MessageStartAnimation);
                    var ViewList = [
                        DiaLogLayout.transparency,
                        DiaLogLayout.messageMax,
                        DiaLogLayout.messageAnimation
                    ];
                    setSliderColor(ViewList, ThemeColors)
                    if (isMessageTime) {
                        DiaLogLayout.isMessageTime.setChecked(true);
                    }
                    //按钮
                    DiaLogLayout.addColor.setOnClickListener(DialogOnClickListener());
                    DiaLogLayout.cancel.setOnClickListener(DialogOnClickListener());
                    DiaLogLayout.affirm.setOnClickListener(DialogOnClickListener());
                    //滚动条
                    DiaLogLayout.transparency.addOnChangeListener(DialogOnChangeListener());
                    DiaLogLayout.messageMax.addOnChangeListener(DialogOnChangeListener());
                    DiaLogLayout.messageAnimation.addOnChangeListener(DialogOnChangeListener());
                    //switch
                    DiaLogLayout.isMessageTime.setOnCheckedChangeListener(DialogOnCheckedChangeListener());
                    //bchipGroup单行
                    DiaLogLayout.chipGroup_Color.setSingleLine(true);
                    //输入框
                    DiaLogLayout.colorEdit.addTextChangedListener(new TextWatcher({
                        beforeTextChanged: function(s, start, count, after) {
                            // 文本变化前调用
                        },
                        onTextChanged: function(s, start, before, count) {
                            // 文本发生变化时调用
                        },
                        afterTextChanged: function(s) {
                            // 文本发生变化后调用
                            DiaLogLayout.ErrorEditLayout.setError(null);
                        }
                    }));


                    //开始计时
                    DiaLogLayout.chronometer.start();
                    //置顶消息
                    DiaLogLayout.chronometer.setFormat("日志" + '\tTime: %s');
                    MessageLayoutinit(DiaLogLayout, BackgroundColors);
                    var Dialog = new MaterialAlertDialogBuilder(activity);
                    Dialog.setTitle("日志个性化");
                    Dialog.setView(DiaLogLayout);
                    Dialog = Dialog.create();
                    Dialog.show();
                    isDialog = true;
                    break;
            }
        }
    });
}



//Text初始化
function DayWordinit() {
    return new java.lang.Thread(new java.lang.Runnable({
            run: function() {
                ui.run(function() {
                    var HomeButtonHidght_Start = ControlClass.getViewHeight(ui.HomeButton, true);
                    ui.DayWord.attr('visibility', 'visible');

                    //ui.DayWord.measure(0, 0);
                    //log(ui.DayWord.getMeasuredHeight());

                    var HomeButtonHidght = ControlClass.getViewHeight(ui.HomeButton, true);
                    //log(HomeButtonHidght)
                    ui.DayWord.attr('visibility', 'gone');
                    var animator = ObjectAnimator.ofFloat(ui.HomeButton, "alpha", HomeButtonHidght_Start, HomeButtonHidght);
                    //var animator = ObjectAnimator.ofFloat(ui.HomeButton, "alpha", 287, 504);
                    animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener({
                        onAnimationUpdate: function(animation) {
                            var params = ui.HomeButton.getLayoutParams();
                            params.height = animation.getAnimatedValue();
                            ui.HomeButton.setLayoutParams(params);
                        }
                    }));
                    var animator_A = ObjectAnimator.ofFloat(ui.DayWord, "alpha", 0, 0.1, 0.5, 1);
                    var set = new AnimatorSet();
                    set.playTogether(animator, animator_A);
                    set.setDuration(400); //动画时间
                    set.start();
                    ui.DayWord.attr('visibility', 'visible');
                });
            }
        }))
        .start();
}




//底部导航栏初始化
function Navigationinit() {
    // 设置底部导航栏的内容
    let menuItems = [];
    let menu = ui.navigation.menu;
    menuItems.push(buildMenuItem(menu, 'Home', ui.R.drawable.ic_home_black_48dp));
    menuItems.push(buildMenuItem(menu, '选项', ui.R.drawable.ic_dashboard_black_48dp));
    menuItems.push(buildMenuItem(menu, '设置', ui.R.drawable.ic_settings_applications_black_48dp));
    // 当底部按钮被选中时，切换ViewPager页面为相应位置的页面
    ui.navigation.setOnNavigationItemSelectedListener(function(item) {
        ui.viewpager.currentItem = menuItems.indexOf(item);
        return true;
    });
    // 当ViewPager页面切换时，切换底部按钮的状态
    ui.viewpager.addOnPageChangeListener(new androidx.viewpager.widget.ViewPager.OnPageChangeListener({
        onPageSelected: function(position) {
            var animator = ObjectAnimator.ofFloat(ui.toolbar, "alpha", 1, 0);
            animator.setDuration(200); //动画时间
            animator.start();
            //更改标题 title 内容
            ui.toolbar.setTitle(menuItems[position] + "");
            var animator = ObjectAnimator.ofFloat(ui.toolbar, "alpha", 0, 1);
            animator.setDuration(200); //动画时间
            animator.start();
            if (menuItems[position] == "选项") {
                var animator = ObjectAnimator.ofFloat(ui.ShapeableImageViewButton, "alpha", 0, 1);
                animator.setDuration(200); //动画时间
                animator.start();
                animator = ObjectAnimator.ofFloat(ui.ShapeableImageViewButton_A, "alpha", 0, 1);
                animator.setDuration(200); //动画时间
                animator.start();
                ui.ShapeableImageViewButton.attr('visibility', 'visible');
                ui.ShapeableImageViewButton_A.attr('visibility', 'visible');
            } else {
                var animator = ObjectAnimator.ofFloat(ui.ShapeableImageViewButton, "alpha", 1, 0, 0);
                animator.setDuration(200); //动画时间
                animator.start();
                animator = ObjectAnimator.ofFloat(ui.ShapeableImageViewButton_A, "alpha", 1, 0, 0);
                animator.setDuration(200); //动画时间
                animator.start();
                setTimeout(function() {
                    ui.ShapeableImageViewButton.attr('visibility', 'gone');
                    ui.ShapeableImageViewButton_A.attr('visibility', 'gone');
                }, 300);
            }
            menuItems[position].setChecked(true);
        }
    }));
}

//改变控件颜色
function ChangeViewColor() {
    var SwitchViewList = [
        ui.stable_mode,
        ui.stop_all_on_volume_up,
        ui.not_show_console,
        ui.foreground_service,
        ui.AccessibilityPermissions,
        ui.FloatingWindowPWPermissions
    ];
    for (var i = 0; i < SwitchViewList.length; i++) {
        //改变switch选中后的颜色
        SwitchViewList[i].setTrackTintList(new ColorStateList([
            [android.R.attr.state_checked]
        ], [colors.parseColor(ThemeColors)]));
    }
    //改变Switch按钮圆形颜色List
    // view.setChipBackgroundColor(buildColorStateList([colors.parseColor("#000000"), colors.parseColor("#fafafa"), colors.parseColor(ThemeColors), colors.parseColor("#49454F")]))

    //底部导航栏---
    //设置图标大小
    //ui.navigation.setItemIconSize(60);
    //设置图标属性
    ui.navigation.setItemIconTintList(buildColorStateList([colors.parseColor("#000000"), colors.parseColor("#fafafa"), colors.parseColor(ThemeColors), colors.parseColor("#49454F")]));
    //设置文字属性
    ui.navigation.setItemTextColor(buildColorStateList([colors.parseColor("#000000"), colors.parseColor("#fafafa"), colors.parseColor(ThemeColors), colors.parseColor("#49454F")]));

    //下拉刷新
    //改变进度条颜色
    ui.swipe.setColorSchemeColors(Color.parseColor("#fafafa"), Color.parseColor("#fafafa"), Color.parseColor("#fafafa"));
    //设置进度条背景颜色
    ui.swipe.setProgressBackgroundColorSchemeColor(Color.parseColor(ThemeColors));

    //进度条控件
    //背景颜色
    //ui.CircularProgressIndicator.setTrackColor(colors.parseColor(ThemeColors));
    //指示器颜色
    ui.CircularProgressIndicator.setIndicatorColor(colors.parseColor(ThemeColors));

    ui.LinearProgressIndicator.setIndicatorColor(colors.parseColor(ThemeColors));

    ui.CircularProgressIndicator_indeterminate_false.setIndicatorColor(colors.parseColor(ThemeColors));

    ui.LinearProgressIndicator_indeterminate_false.setIndicatorColor(colors.parseColor(ThemeColors));



    //滑块控件
    //???
    //ui.Slider.setThumbStrokeColor(ColorStateList.valueOf(Color.parseColor(ThemeColors)));
    //toast(ui.Slider.setThumbColor)
    var ViewList = [
        ui.Slider,
        ui.Slider_stepSize
    ];
    setSliderColor(ViewList, ThemeColors);
}







function setSliderColor(ViewList, Color) {
    for (var i = 0; i < ViewList.length; i++) {
        //光晕颜色
        ViewList[i].setHaloTintList(ColorStateList.valueOf(android.graphics.Color.parseColor(Color + "00")));
        //圆形颜色
        ViewList[i].setThumbTintList(ColorStateList.valueOf(android.graphics.Color.parseColor(Color)))
        //设置轨道活动部分上刻度的颜色。
        ViewList[i].setTickActiveTintList(ColorStateList.valueOf(android.graphics.Color.parseColor(Color + "00")))
        //设置轨道非活动部分的刻度线颜色。
        ViewList[i].setTickInactiveTintList(ColorStateList.valueOf(android.graphics.Color.parseColor(Color)))
        //刻度线颜色
        ViewList[i].setTickTintList(ColorStateList.valueOf(android.graphics.Color.parseColor(Color)))
        //设置轨道活动部分的颜色。
        ViewList[i].setTrackActiveTintList(ColorStateList.valueOf(android.graphics.Color.parseColor(Color)))
        //设置非活动部分的值
        //ViewList[i].setTrackInactiveTintList(ColorStateList.valueOf(android.graphics.Color.parseColor(Color + "0")))
    }
}


/**
 * 获取控件的高度或者宽度
 *   isHeight=true     则为测量该控件的高度
 *   isHeight=false    则为测量该控件的宽度
 * @param view
 * @param isHeight
 * @return
 */
function getViewHeight(view, isHeight) {
    if (view == null) return 0;
    var result;
    var w = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED);
    var h = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED);
    view.measure(w, h);
    if (isHeight) {
        result = view.getMeasuredHeight();
    } else {
        result = view.getMeasuredWidth();
    }
    return result;
}

function buildMenuItem(menu, title, icon) {
    let menuItem = menu.add(title);
    menuItem.setIcon(icon);
    return menuItem;
}

//界面缓存
function Cacheinit() {
    //无障碍权限
    if (GetAccessible()) {
        ui.AccessibilityPermissions.setChecked(true);
    }
    //悬浮窗权限
    if (DetermineWindowPermissions()) {
        ui.FloatingWindowPWPermissions.setChecked(true);
    }
    //设置界面4按钮
    var ViewList = [
        "stable_mode",
        "stop_all_on_volume_up",
        "not_show_console",
        "foreground_service"
    ];
    for (var i = 0; i < ViewList.length; i++) {
        if ($settings.isEnabled(ViewList[i])) {
            ui[ViewList[i]].setChecked(true);
        }
    }
}
//亮色状态栏
function StatusBarTransparency() {
    importClass(android.view.View);
    // 状态栏背景透明, 不加的话, 状态栏是绿色, 默认的主题色
    ui.statusBarColor(colors.TRANSPARENT);
    var SystemUiVisibility = (ve) => {
        var option =
            //View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
            (ve ? View.SYSTEM_UI_FLAG_LAYOUT_STABLE : View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
        activity.getWindow()
            .getDecorView()
            .setSystemUiVisibility(option);
    };
    SystemUiVisibility(false);
}

function GetAccessible() {
    // body...
    importClass("android.content.pm.PackageManager");
    importClass("android.provider.Settings");
    const myPackageName = context.getPackageName(); //获取应用的包名
    if (auto.rootInActiveWindow) return true;
    else return false;
}

function DetermineWindowPermissions() {
    return (new android.provider.Settings)
        .canDrawOverlays(context);
}
//改变控件
function buildColorStateList(JsDrawable) {
    var stateColorList = [
        JsDrawable[0], //按下
        JsDrawable[1], //无
        JsDrawable[2], //聚焦
        JsDrawable[3] //正常
    ];
    var stateList = [
        [android.R.attr.state_pressed],
        [android.R.attr.state_focused],
        [android.R.attr.state_checked],
        [],
    ];
    return new ColorStateList(stateList, stateColorList);
}

function dateFormat(date, fmt_str) {
    return java.text.SimpleDateFormat(fmt_str)
        .format(new Date(date || new Date()));
}











module.exports = this;