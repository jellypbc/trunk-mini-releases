#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{
  api,
  Manager,
  CustomMenuItem,
  Menu,
  MenuItem,
  Submenu,
  WindowBuilder,
  WindowUrl
};

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
        .add_native_item(MenuItem::Quit)
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
      window.set_title("butts");
      Ok(())
    })
    .menu(menu)
    .on_menu_event(|event| {
      match event.menu_item_id() {
        "quit" => {
          std::process::exit(0);
        }
        "close" => {
          event.window().close().unwrap();
        }
        _ => {}
      }
    })
    .run(ctx)
    .expect("error while running tauri application");
}
