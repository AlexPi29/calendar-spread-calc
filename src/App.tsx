import { SpreadTable } from './components/SpreadTable'
import { Toaster } from 'sonner'

function App() {
    return (
        <div className="min-h-screen bg-background">
            <SpreadTable />
            <Toaster position="bottom-right" />
        </div>
    )
}

export default App