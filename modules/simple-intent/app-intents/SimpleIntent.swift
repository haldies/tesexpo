import AppIntents

@available(iOS 16.0, *)
struct AddTodoIntent: AppIntent {
    static var title: LocalizedStringResource = "Tambah To-Do"
    static var description = IntentDescription("Menambahkan tugas baru ke daftar to-do.")
    static var openAppWhenRun: Bool = false
    
    @Parameter(title: "Nama Tugas")
    var todoText: String

    func perform() async throws -> some IntentResult & ReturnsValue<String> {
        let defaults = UserDefaults.standard
        var todos = defaults.stringArray(forKey: "my_todos") ?? []
        todos.append(todoText)
        defaults.set(todos, forKey: "my_todos")
        return .result(value: "'\(todoText)' sudah masuk daftar!")
    }
}

@available(iOS 16.0, *)
struct TodoShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: AddTodoIntent(),
            phrases: [
                "Tambah tugas \(.$todoText) di \(.applicationName)",
                "Catat tugas di \(.applicationName)",
                "Tambah kerjaan \(.$todoText) ke \(.applicationName)"
            ],
            shortTitle: "Tambah To-Do",
            systemImageName: "checklist"
        )
    }
}
