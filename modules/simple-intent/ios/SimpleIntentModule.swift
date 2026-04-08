import ExpoModulesCore

public class SimpleIntentModule: Module {
  public func definition() -> ModuleDefinition {
    Name("TodoModule")

    // Fungsi untuk mengambil data dari native ke JS
    Function("getTodos") { () -> [String] in
      return UserDefaults.standard.stringArray(forKey: "my_todos") ?? []
    }

    // Fungsi untuk menghapus semua data
    Function("clearTodos") {
      UserDefaults.standard.removeObject(forKey: "my_todos")
    }
  }
}
