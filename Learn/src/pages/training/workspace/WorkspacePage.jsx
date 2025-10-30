import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Download, 
  Upload,
  Save,
  Terminal,
  Code2,
  Microchip,
  Activity,
  Settings,
  Monitor,
  Smartphone,
  Thermometer,
  Lightbulb,
  Wifi,
  Battery,
  Zap,
  Plus,
  Trash2,
  Copy,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  FolderOpen,
  GitBranch,
  PlayCircle
} from 'lucide-react';

const WorkspacePage = () => {
  const [activeTab, setActiveTab] = useState('code');
  const [isRunning, setIsRunning] = useState(false);
  const [code, setCode] = useState(`// IoT Device Simulation - Temperature Monitor
// Connect a virtual temperature sensor and monitor readings

#include <WiFi.h>
#include <PubSubClient.h>

// WiFi credentials
const char* ssid = "your_wifi_network";
const char* password = "your_password";

// MQTT settings
const char* mqtt_server = "broker.hivemq.com";
const int mqtt_port = 1883;
const char* topic = "ecoswarm/temperature";

// Pin definitions
const int temperaturePin = A0;
const int ledPin = LED_BUILTIN;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  
  // Connect to WiFi
  connectWiFi();
  
  // Setup MQTT
  client.setServer(mqtt_server, mqtt_port);
}

void loop() {
  if (!client.connected()) {
    reconnectMQTT();
  }
  client.loop();
  
  // Read temperature sensor
  float temperature = readTemperature();
  
  // Send data to MQTT broker
  char tempString[8];
  dtostrf(temperature, 1, 2, tempString);
  client.publish(topic, tempString);
  
  // Visual feedback
  digitalWrite(ledPin, temperature > 25 ? HIGH : LOW);
  
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println("°C");
  
  delay(5000); // Send data every 5 seconds
}

float readTemperature() {
  int sensorValue = analogRead(temperaturePin);
  // Convert analog reading to temperature (simulated)
  float voltage = sensorValue * (3.3 / 4096.0);
  float temperature = voltage * 100; // Simple conversion
  return temperature;
}

void connectWiFi() {
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\\nWiFi connected!");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnectMQTT() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    
    if (client.connect("ESP32_Device")) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}`);
  
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [devices, setDevices] = useState([
    {
      id: 'temp-sensor-1',
      name: 'Temperature Sensor',
      type: 'sensor',
      icon: Thermometer,
      status: 'active',
      value: 23.5,
      unit: '°C',
      connected: true,
      data: []
    },
    {
      id: 'led-1',
      name: 'LED Indicator',
      type: 'actuator',
      icon: Lightbulb,
      status: 'inactive',
      value: 0,
      unit: '',
      connected: true,
      data: []
    },
    {
      id: 'wifi-module',
      name: 'WiFi Module',
      type: 'communication',
      icon: Wifi,
      status: 'active',
      value: 'Connected',
      unit: '',
      connected: true,
      data: []
    }
  ]);
  
  const [flowchartNodes, setFlowchartNodes] = useState([
    { id: '1', type: 'start', label: 'Start', x: 100, y: 50 },
    { id: '2', type: 'process', label: 'Initialize Sensors', x: 100, y: 150 },
    { id: '3', type: 'decision', label: 'WiFi Connected?', x: 100, y: 250 },
    { id: '4', type: 'process', label: 'Read Temperature', x: 250, y: 250 },
    { id: '5', type: 'process', label: 'Send to MQTT', x: 250, y: 350 },
    { id: '6', type: 'decision', label: 'Temp > 25°C?', x: 100, y: 350 },
    { id: '7', type: 'process', label: 'Turn LED ON', x: 250, y: 450 },
    { id: '8', type: 'process', label: 'Turn LED OFF', x: 50, y: 450 },
    { id: '9', type: 'end', label: 'Wait 5s', x: 150, y: 550 }
  ]);
  
  const [selectedNode, setSelectedNode] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleOutput]);

  const simulateCodeExecution = () => {
    setIsRunning(true);
    setConsoleOutput([]);
    
    const simulationSteps = [
      { type: 'info', message: '🔧 Initializing IoT device simulation...' },
      { type: 'info', message: '📡 Connecting to WiFi network...' },
      { type: 'success', message: '✅ WiFi connected successfully!' },
      { type: 'info', message: '🔗 Establishing MQTT connection...' },
      { type: 'success', message: '✅ MQTT broker connected' },
      { type: 'info', message: '🌡️ Starting temperature monitoring...' }
    ];
    
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < simulationSteps.length) {
        setConsoleOutput(prev => [...prev, simulationSteps[stepIndex]]);
        stepIndex++;
      } else {
        // Start continuous monitoring
        startDeviceMonitoring();
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  };

  const startDeviceMonitoring = () => {
    const monitoringInterval = setInterval(() => {
      if (!isRunning) {
        clearInterval(monitoringInterval);
        return;
      }
      
      // Simulate temperature readings
      const newTemp = 20 + Math.random() * 15;
      const timestamp = new Date().toLocaleTimeString();
      
      setDevices(prev => prev.map(device => {
        if (device.id === 'temp-sensor-1') {
          const newDataPoint = { time: timestamp, value: newTemp };
          return {
            ...device,
            value: newTemp,
            data: [...device.data.slice(-9), newDataPoint]
          };
        }
        if (device.id === 'led-1') {
          return {
            ...device,
            status: newTemp > 25 ? 'active' : 'inactive',
            value: newTemp > 25 ? 1 : 0
          };
        }
        return device;
      }));
      
      setConsoleOutput(prev => [...prev, {
        type: 'data',
        message: `📊 Temperature: ${newTemp.toFixed(2)}°C | LED: ${newTemp > 25 ? 'ON' : 'OFF'} | Sent to MQTT: ecoswarm/temperature`
      }]);
    }, 2000);
  };

  const stopSimulation = () => {
    setIsRunning(false);
    setConsoleOutput(prev => [...prev, { type: 'warning', message: '⏹️ Simulation stopped' }]);
  };

  const clearConsole = () => {
    setConsoleOutput([]);
  };

  const saveCode = () => {
    // In a real app, this would save to backend
    setConsoleOutput(prev => [...prev, { type: 'success', message: '💾 Code saved successfully!' }]);
  };

  const getNodeColor = (type) => {
    switch (type) {
      case 'start': return 'from-green-400 to-emerald-500';
      case 'end': return 'from-red-400 to-pink-500';
      case 'process': return 'from-blue-400 to-cyan-500';
      case 'decision': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getNodeShape = (type) => {
    switch (type) {
      case 'decision': return 'rounded-full';
      default: return 'rounded-lg';
    }
  };

  const DeviceCard = ({ device }) => {
    const Icon = device.icon;
    
    return (
      <div className={`bg-white rounded-lg border-2 p-4 ${
        device.connected ? 'border-emerald-200' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
              device.status === 'active' ? 'bg-emerald-100' : 'bg-gray-100'
            }`}>
              <Icon className={`w-5 h-5 ${
                device.status === 'active' ? 'text-emerald-600' : 'text-gray-400'
              }`} />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-900">{device.name}</h3>
              <p className="text-xs text-emerald-600 capitalize">{device.type}</p>
            </div>
          </div>
          <div className={`w-3 h-3 rounded-full ${
            device.connected ? 'bg-emerald-500' : 'bg-gray-300'
          }`} />
        </div>
        
        <div className="mb-3">
          <div className="text-2xl font-bold text-emerald-900">
            {device.value}{device.unit && <span className="text-sm text-emerald-600 ml-1">{device.unit}</span>}
          </div>
          <div className="text-xs text-emerald-600">
            Status: <span className={`font-semibold ${
              device.status === 'active' ? 'text-emerald-600' : 'text-gray-500'
            }`}>{device.status}</span>
          </div>
        </div>
        
        {device.data.length > 0 && (
          <div className="mt-3 pt-3 border-t border-emerald-100">
            <div className="text-xs text-emerald-600 mb-2">Recent Data:</div>
            <div className="space-y-1 max-h-20 overflow-y-auto">
              {device.data.slice(-3).map((point, idx) => (
                <div key={idx} className="text-xs text-emerald-700 flex justify-between">
                  <span>{point.time}</span>
                  <span className="font-semibold">{point.value.toFixed(2)}{device.unit}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">IoT Workspace</h1>
          <p className="text-emerald-600">Practice with virtual devices and real-time simulation</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={saveCode}
            className="px-4 py-2 bg-white text-emerald-700 border border-emerald-200 rounded-lg font-semibold text-sm hover:bg-emerald-50 transition-all duration-200 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>
          <button
            onClick={() => window.open('/workspace/share', '_blank')}
            className="px-4 py-2 bg-white text-emerald-700 border border-emerald-200 rounded-lg font-semibold text-sm hover:bg-emerald-50 transition-all duration-200 flex items-center"
          >
            <Copy className="w-4 h-4 mr-2" />
            Share
          </button>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-lg border border-emerald-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {!isRunning ? (
              <button
                onClick={simulateCodeExecution}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-all duration-200 flex items-center"
              >
                <Play className="w-4 h-4 mr-2" />
                Run Simulation
              </button>
            ) : (
              <button
                onClick={stopSimulation}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-sm hover:bg-red-600 transition-all duration-200 flex items-center"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop
              </button>
            )}
            <button
              onClick={() => {
                setCode('');
                setConsoleOutput([]);
              }}
              className="px-4 py-2 bg-white text-emerald-700 border border-emerald-200 rounded-lg font-semibold text-sm hover:bg-emerald-50 transition-all duration-200 flex items-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center text-emerald-600">
              <Activity className="w-4 h-4 mr-1" />
              {isRunning ? 'Running' : 'Stopped'}
            </div>
            <div className="flex items-center text-emerald-600">
              <Clock className="w-4 h-4 mr-1" />
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Code Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-lg border border-emerald-200">
            <div className="flex border-b border-emerald-200">
              <button
                onClick={() => setActiveTab('code')}
                className={`flex-1 py-3 px-4 font-medium text-sm transition-all duration-200 flex items-center justify-center ${
                  activeTab === 'code'
                    ? 'text-emerald-900 border-b-2 border-emerald-500 bg-emerald-50'
                    : 'text-emerald-600 hover:text-emerald-900'
                }`}
              >
                <Code2 className="w-4 h-4 mr-2" />
                Code Editor
              </button>
              <button
                onClick={() => setActiveTab('flowchart')}
                className={`flex-1 py-3 px-4 font-medium text-sm transition-all duration-200 flex items-center justify-center ${
                  activeTab === 'flowchart'
                    ? 'text-emerald-900 border-b-2 border-emerald-500 bg-emerald-50'
                    : 'text-emerald-600 hover:text-emerald-900'
                }`}
              >
                <GitBranch className="w-4 h-4 mr-2" />
                Flowchart
              </button>
            </div>
            
            <div className="p-4">
              {activeTab === 'code' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-emerald-700">Arduino C++ Code</span>
                    <div className="flex items-center space-x-2">
                      <button className="text-emerald-600 hover:text-emerald-700">
                        <Upload className="w-4 h-4" />
                      </button>
                      <button className="text-emerald-600 hover:text-emerald-700">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      spellCheck={false}
                    />
                    <div className="absolute top-2 right-2 text-xs text-gray-500">
                      Line {code.split('\n').length}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-emerald-700">Program Flowchart</span>
                    <div className="flex items-center space-x-2">
                      <button className="text-emerald-600 hover:text-emerald-700">
                        <Plus className="w-4 h-4" />
                      </button>
                      <button className="text-emerald-600 hover:text-emerald-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="relative h-96 bg-gray-50 rounded-lg border-2 border-dashed border-emerald-200 overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full">
                      {/* Connections */}
                      <line x1="150" y1="90" x2="150" y2="130" stroke="#10b981" strokeWidth="2" />
                      <line x1="150" y1="190" x2="150" y2="230" stroke="#10b981" strokeWidth="2" />
                      <line x1="200" y1="270" x2="230" y2="270" stroke="#10b981" strokeWidth="2" />
                      <line x1="300" y1="290" x2="300" y2="330" stroke="#10b981" strokeWidth="2" />
                      <line x1="250" y1="370" x2="200" y2="410" stroke="#10b981" strokeWidth="2" />
                      <line x1="100" y1="370" x2="100" y2="410" stroke="#10b981" strokeWidth="2" />
                      <line x1="125" y1="470" x2="145" y2="530" stroke="#10b981" strokeWidth="2" />
                      <line x1="175" y1="470" x2="155" y2="530" stroke="#10b981" strokeWidth="2" />
                    </svg>
                    
                    {flowchartNodes.map((node) => (
                      <div
                        key={node.id}
                        className={`absolute w-24 h-12 bg-gradient-to-br ${getNodeColor(node.type)} ${getNodeShape(node.type)} flex items-center justify-center text-white text-xs font-semibold cursor-move shadow-lg`}
                        style={{ left: `${node.x}px`, top: `${node.y}px` }}
                        onClick={() => setSelectedNode(node)}
                      >
                        {node.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Console Output */}
          <div className="bg-white rounded-lg border border-emerald-200">
            <div className="flex items-center justify-between p-4 border-b border-emerald-200">
              <div className="flex items-center">
                <Terminal className="w-4 h-4 mr-2 text-emerald-600" />
                <span className="font-medium text-emerald-900">Console Output</span>
              </div>
              <button
                onClick={clearConsole}
                className="text-emerald-600 hover:text-emerald-700 text-sm"
              >
                Clear
              </button>
            </div>
            <div
              ref={consoleRef}
              className="h-48 p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-y-auto"
            >
              {consoleOutput.length === 0 ? (
                <div className="text-gray-500">Console output will appear here...</div>
              ) : (
                consoleOutput.map((output, index) => (
                  <div key={index} className={`mb-1 ${
                    output.type === 'error' ? 'text-red-400' :
                    output.type === 'warning' ? 'text-yellow-400' :
                    output.type === 'success' ? 'text-green-400' :
                    output.type === 'data' ? 'text-cyan-400' :
                    'text-gray-300'
                  }`}>
                    [{new Date().toLocaleTimeString()}] {output.message}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Devices */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-emerald-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-emerald-900">Connected Devices</h3>
              <button className="text-emerald-600 hover:text-emerald-700">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {devices.map((device) => (
                <DeviceCard key={device.id} device={device} />
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 border-2 border-dashed border-emerald-200 rounded-lg text-emerald-600 hover:border-emerald-300 hover:text-emerald-700 transition-all duration-200 flex items-center justify-center">
              <Plus className="w-4 h-4 mr-2" />
              Add Device
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200 p-4">
            <h3 className="font-bold text-emerald-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full py-2 px-3 bg-white text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-all duration-200 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                View Documentation
              </button>
              <button className="w-full py-2 px-3 bg-white text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-all duration-200 flex items-center">
                <FolderOpen className="w-4 h-4 mr-2" />
                Load Example
              </button>
              <button className="w-full py-2 px-3 bg-white text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-all duration-200 flex items-center">
                <Monitor className="w-4 h-4 mr-2" />
                Device Monitor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;
