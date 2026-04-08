import AppIntents

// SEMUA DALAM SATU FILE UNTUK MENGHINDARI ERROR METADATA
@available(iOS 16.0, *)
public struct SimpleIntent: AppIntent {
    public static var title: LocalizedStringResource = "Tambah To-Do"
    public static var description = IntentDescription("Menambahkan tugas baru ke daftar to-do.")

    public static var openAppWhenRun: Bool = false
    
    @Parameter(title: "Tugas")
    public var todoText: String // Menggunakan nama yang sangat jelas

    public init() {}

    public func perform() async throws -> some IntentResult & ReturnsValue<String> {
        let defaults = UserDefaults.standard
        var todos = defaults.stringArray(forKey: "my_todos") ?? []
        todos.append(todoText)
        defaults.set(todos, forKey: "my_todos")
        
        return .result(value: "Sip! '\(todoText)' sudah masuk daftar.")
    }
}

@available(iOS 16.0, *)
public struct SimpleShortcuts: AppShortcutsProvider {
    public static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: SimpleIntent(),
            phrases: [
                "Tambah tugas \(.todoText) di \(.applicationName)",
                "Catat tugas di \(.applicationName)",
                "Tambah kerjaan \(.todoText) ke \(.applicationName)"
            ],
            shortTitle: "Tambah To-Do",
            systemImageName: "checklist"
        )
    }
}
