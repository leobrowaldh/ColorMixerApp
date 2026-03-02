import { useState } from 'react';

function App() {
    const [color1, setColor1] = useState('#ff0000');
    const [color2, setColor2] = useState('#0000ff');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const mixColors = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/mix', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ color1, color2 }),
            });
            const data = await response.json();
            setResult(data.result);
        } catch (error) {
            console.error('Error mixing colors:', error);
            alert('Failed to mix colors. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Color Mixer</h1>
            <div className="mixer-controls">
                <div className="picker-group">
                    <label>Color 1</label>
                    <input
                        type="color"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                    />
                    <span className="hex-label">{color1}</span>
                </div>
                <div className="picker-group">
                    <label>Color 2</label>
                    <input
                        type="color"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                    />
                    <span className="hex-label">{color2}</span>
                </div>
            </div>

            <button onClick={mixColors} disabled={loading}>
                {loading ? 'Mixing...' : 'Mix Colors'}
            </button>

            {result && (
                <div className="result-area">
                    <h2>Result</h2>
                    <div
                        className="preview-box"
                        style={{ backgroundColor: result }}
                    ></div>
                    <p className="result-hex">{result}</p>
                </div>
            )}
        </div>
    );
}

export default App;
