#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{api, CustomMenuItem, Manager, Menu, MenuItem, Submenu, WindowBuilder, WindowUrl};
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

    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");

    let menu = Menu::new()
        .add_submenu(Submenu::new(
            "Trunk Mini",
            Menu::new()
                .add_item(quit)
                .add_item(close)
                .add_item(custom_menu("New").accelerator("cmdOrControl+N"))
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Quit),
        ))
        .add_native_item(MenuItem::About("Trunk".to_string()))
        .add_native_item(MenuItem::Copy)
        .add_native_item(MenuItem::Quit)
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Services)
        .add_native_item(MenuItem::HideOthers)
        .add_native_item(MenuItem::ShowAll)
        .add_native_item(MenuItem::Separator)
        .add_item(CustomMenuItem::new("hide", "Hide"));

    let ctx = tauri::generate_context!();
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            window.set_title("Trunk Mini").unwrap();
            window.set_transparent_titlebar(true);

            #[cfg(any(target_os = "windows", target_os = "macos"))]
            set_shadow(&window, true).unwrap();

            Ok(())
        })
        .menu(menu)
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
