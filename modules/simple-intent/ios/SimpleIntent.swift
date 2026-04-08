import AppIntents

struct SimpleIntent: AppIntent {
    static var title: LocalizedStringResource = "Tambah To-Do"
    static var description = IntentDescription("Menambahkan tugas baru ke daftar to-do.")

    static var openAppWhenRun: Bool = false
    
    @Parameter(title: "Tugas")
    var task: String?

    func perform() async throws -> some IntentResult & ReturnsValue<String> {
        let taskTitle: String
        if let input = task {
            taskTitle = input
        } else {
            throw $task.requestValue("Apa yang ingin dikerjakan?")
        }
        
        // Simpan ke UserDefaults agar bisa dibaca oleh aplikasi utama
        let defaults = UserDefaults.standard
        var todos = defaults.stringArray(forKey: "my_todos") ?? []
        todos.append(taskTitle)
        defaults.set(todos, forKey: "my_todos")
        
        return .result(value: "Sip! '\(taskTitle)' sudah masuk daftar.")
    }
}
