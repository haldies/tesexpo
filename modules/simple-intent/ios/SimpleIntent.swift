import AppIntents

@available(iOS 16.0, *)
public struct SimpleIntent: AppIntent {
    public static var title: LocalizedStringResource = "Tambah To-Do"
    public static var description = IntentDescription("Menambahkan tugas baru ke daftar to-do.")

    public static var openAppWhenRun: Bool = false
    
    @Parameter(title: "Tugas")
    public var todoTitle: String

    public init() {}

    public func perform() async throws -> some IntentResult & ReturnsValue<String> {
        // Simpan ke UserDefaults
        let defaults = UserDefaults.standard
        var todos = defaults.stringArray(forKey: "my_todos") ?? []
        todos.append(todoTitle)
        defaults.set(todos, forKey: "my_todos")
        
        return .result(value: "Sip! '\(todoTitle)' sudah masuk daftar.")
    }
}
