import AppIntents

@available(iOS 16.0, *)
struct SimpleIntent: AppIntent {
    static var title: LocalizedStringResource = "Tambah To-Do"
    static var description = IntentDescription("Menambahkan tugas baru ke daftar to-do.")

    static var openAppWhenRun: Bool = false
    
    @Parameter(title: "Tugas")
    var name: String // Diganti kembali ke 'name' untuk stabilitas compiler

    func perform() async throws -> some IntentResult & ReturnsValue<String> {
        let defaults = UserDefaults.standard
        var todos = defaults.stringArray(forKey: "my_todos") ?? []
        todos.append(name)
        defaults.set(todos, forKey: "my_todos")
        
        return .result(value: "Sip! '\(name)' sudah masuk daftar.")
    }
}
