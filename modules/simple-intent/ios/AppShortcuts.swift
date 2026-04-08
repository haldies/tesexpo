import AppIntents

@available(iOS 16.0, *)
public struct SimpleShortcuts: AppShortcutsProvider {
    public static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: SimpleIntent(),
            phrases: [
                "Tambah tugas \(.todoTitle) di \(.applicationName)",
                "Catat tugas di \(.applicationName)",
                "Tambah kerjaan \(.todoTitle) ke \(.applicationName)"
            ],
            shortTitle: "Tambah To-Do",
            systemImageName: "checklist"
        )
    }
}
