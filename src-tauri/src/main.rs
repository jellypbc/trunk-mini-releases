#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]


#[allow(unused_imports)]
use tauri::{api, CustomMenuItem, Manager, Menu, MenuItem, MenuEntry, Submenu, WindowBuilder, WindowUrl, AboutMetadata};
use window_shadows::set_shadow;

// mod transparent_window;
use cocoa::appkit::{NSWindow, NSWindowStyleMask};
use tauri::{Runtime, Window};

pub trait WindowExt {
    #[cfg(target_os = "macos")]
    fn set_transparent_titlebar(&self, transparent: bool);
}

impl<R: Runtime> WindowExt for Window<R> {
    #[cfg(target_os = "macos")]
    fn set_transparent_titlebar(&self, transparent: bool) {
        use cocoa::appkit::NSWindowTitleVisibility;

        unsafe {
            let id = self.ns_window().unwrap() as cocoa::base::id;

            let mut style_mask = id.styleMask();
            style_mask.set(
                NSWindowStyleMask::NSFullSizeContentViewWindowMask,
                transparent,
            );
            id.setStyleMask_(style_mask);

            id.setTitleVisibility_(if transparent {
                NSWindowTitleVisibility::NSWindowTitleHidden
            } else {
                NSWindowTitleVisibility::NSWindowTitleVisible
            });
            id.setTitlebarAppearsTransparent_(if transparent {
                cocoa::base::YES
            } else {
                cocoa::base::NO
            });
        }
    }
}

fn main() {
    fn custom_menu(name: &str) -> CustomMenuItem {
        let c = CustomMenuItem::new(name.to_string(), name);
        return c;
    }

    let ctx = tauri::generate_context!();

    let menu = Menu::new().add_submenu(Submenu::new(
        "Trunk",
        Menu::new()
            .add_item(CustomMenuItem::new("quit".to_string(), "Quit").accelerator("cmdOrControl+q"))
            .add_item(CustomMenuItem::new("close".to_string(), "Close"))
            .add_item(custom_menu("New").accelerator("cmdOrControl+N"))
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Quit),
        ))
        .add_native_item( MenuItem::About("Trunk".to_string(), AboutMetadata::new() ) )
        .add_native_item(MenuItem::Copy)
        .add_native_item(MenuItem::Quit)
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Services)
        .add_native_item(MenuItem::HideOthers)
        .add_native_item(MenuItem::ShowAll)
        .add_native_item(MenuItem::Separator)
        .add_item(CustomMenuItem::new("hide", "Hide"))
    .add_submenu(Submenu::new(
        "Edit", Menu::new()
    ));


    // ----

    let menu2 = Menu::with_items([
        #[cfg(target_os = "macos")]
        MenuEntry::Submenu(Submenu::new(
            "Trunk",
            Menu::with_items([
                MenuItem::About(ctx.package_info().name.clone(), AboutMetadata::new()).into(),
                MenuItem::Separator.into(),
                MenuItem::Services.into(),
                MenuItem::Separator.into(),
                MenuItem::Hide.into(),
                MenuItem::HideOthers.into(),
                MenuItem::ShowAll.into(),
                MenuItem::Separator.into(),
                MenuItem::Quit.into(),
            ]),
        )),
        MenuEntry::Submenu(Submenu::new(
          "Edit",
          Menu::with_items([
            MenuItem::Undo.into(),
            MenuItem::Redo.into(),
            MenuItem::Separator.into(),
            MenuItem::Cut.into(),
            MenuItem::Copy.into(),
            MenuItem::Paste.into(),
            #[cfg(not(target_os = "macos"))]
            MenuItem::Separator.into(),
            MenuItem::SelectAll.into(),
          ]),
        )),
        MenuEntry::Submenu(Submenu::new(
          "Window",
          Menu::with_items([MenuItem::Minimize.into(), MenuItem::Zoom.into()]),
        )),
        // You should always have a Help menu on macOS because it will automatically
        // show a menu search field
        MenuEntry::Submenu(Submenu::new(
          "Help",
          Menu::with_items([CustomMenuItem::new("Learn More", "Learn More").into()]),
        ))
    ]);

    // ----

    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            window.set_title("Trunk").unwrap();
            window.set_transparent_titlebar(true);

            #[cfg(any(target_os = "windows", target_os = "macos"))]
            set_shadow(&window, true).unwrap();

            Ok(())
        })
        .menu(menu2)
        .on_menu_event(|event| match event.menu_item_id() {
            "quit" => {
                std::process::exit(0);
            }
            "close" => {
                event.window().close().unwrap();
            }
            _ => {}
        })
        .run(ctx)
        .expect("error while running tauri application");
}
