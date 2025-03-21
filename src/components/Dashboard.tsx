// src/components/Dashboard.jsx
import React from 'react';
import { useAppSelector } from '../app/hooks';
import { selectTasksStats, selectFilteredTasks } from '../features/tasks/tasksSlice';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const Dashboard = () => {
  const stats = useAppSelector(selectTasksStats);
  const tasks = useAppSelector(selectFilteredTasks) as Array<{ id: string; completed: boolean; updatedAt: string }>;
  
  // Format data for the charts
  const statusData = [
    { name: 'Completed', value: stats.completed, color: '#4CAF50' },
    { name: 'Active', value: stats.active, color: '#2196F3' },
  ];
  
  const priorityData = [
    { name: 'High', value: stats.byPriority.high, color: '#F44336' },
    { name: 'Medium', value: stats.byPriority.medium, color: '#FFC107' },
    { name: 'Low', value: stats.byPriority.low, color: '#4CAF50' },
  ];
  
  const categoryData = Object.keys(stats.byCategory).map(category => ({
    name: category || 'No Category',
    value: stats.byCategory[category],
    // Generate color based on index
    color: `hsl(${(Object.keys(stats.byCategory).indexOf(category) * 137) % 360}, 70%, 65%)`,
  }));
  
  // Calculate weekly progress
  const now = new Date();
  const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
  
  const weeklyTasksCompleted = tasks.filter(
    task => task.completed && new Date(task.updatedAt) >= oneWeekAgo
  ).length;
  
  // Main container styles
  const containerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
    padding: '24px',
    margin: '0 auto',
    maxWidth: '100%'
  };
  
  const titleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '24px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '12px'
  };
  
  // Stats cards container
  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
    marginBottom: '32px'
  };
  
  // Individual stat card styles
  const createStatCardStyle = (bgColor, textColor, shadowColor) => ({
    backgroundColor: bgColor,
    padding: '20px',
    borderRadius: '10px',
    boxShadow: `0 4px 6px ${shadowColor}`,
    display: 'flex',
    flexDirection: 'column' as React.CSSProperties['flexDirection'],
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
    border: '1px solid rgba(0,0,0,0.05)',
    ':hover': {
      transform: 'translateY(-5px)'
    }
  });
  
  const statCardTitleStyle = (color) => ({
    fontSize: '18px',
    fontWeight: '500',
    color: color,
    marginBottom: '8px'
  });
  
  const statCardValueStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b'
  };
  
  // Progress bar styles
  const progressContainerStyle = {
    marginBottom: '32px'
  };
  
  const progressTitleStyle = {
    fontSize: '18px',
    fontWeight: '500',
    marginBottom: '8px',
    color: '#1e293b'
  };
  
  const progressBackgroundStyle = {
    width: '100%',
    backgroundColor: '#e2e8f0',
    borderRadius: '8px',
    height: '8px',
    overflow: 'hidden'
  };
  
  const progressBarStyle = {
    height: '100%',
    borderRadius: '8px',
    backgroundColor: '#3b82f6',
    transition: 'width 0.5s ease-in-out'
  };
  
  const progressTextStyle: React.CSSProperties = {
      textAlign: 'right',
      marginTop: '4px',
      fontSize: '14px',
      color: '#64748b'
    };
  
  // Charts grid
  const chartsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '24px'
  };
  
  // Individual chart container
  const chartContainerStyle = {
    backgroundColor: '#f8fafc',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0'
  };
  
  const fullWidthChartStyle = {
    ...chartContainerStyle,
    gridColumn: '1 / -1'
  };
  
  const chartTitleStyle = {
    fontSize: '18px',
    fontWeight: '500',
    marginBottom: '16px',
    color: '#1e293b'
  };
  
  const noDataStyle: React.CSSProperties = {
      textAlign: 'center',
      padding: '48px 0',
      color: '#94a3b8',
      fontSize: '16px',
      fontStyle: 'italic'
    };
  
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Task Dashboard</h2>
      
      {/* Stats Cards */}
      <div style={statsGridStyle}>
        <div 
          style={createStatCardStyle('#eff6ff', '#1e40af', 'rgba(59, 130, 246, 0.1)')}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <h3 style={statCardTitleStyle('#1e40af')}>Total Tasks</h3>
          <p style={statCardValueStyle}>{stats.total}</p>
        </div>
        
        <div 
          style={createStatCardStyle('#f0fdf4', '#166534', 'rgba(34, 197, 94, 0.1)')}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <h3 style={statCardTitleStyle('#166534')}>Completed</h3>
          <p style={statCardValueStyle}>{stats.completed}</p>
        </div>
        
        <div 
          style={createStatCardStyle('#fffbeb', '#854d0e', 'rgba(234, 179, 8, 0.1)')}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <h3 style={statCardTitleStyle('#854d0e')}>Active</h3>
          <p style={statCardValueStyle}>{stats.active}</p>
        </div>
        
        <div 
          style={createStatCardStyle('#faf5ff', '#6b21a8', 'rgba(168, 85, 247, 0.1)')}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <h3 style={statCardTitleStyle('#6b21a8')}>Weekly Completed</h3>
          <p style={statCardValueStyle}>{weeklyTasksCompleted}</p>
        </div>
      </div>
      
      {/* Completion Rate Progress */}
      <div style={progressContainerStyle}>
        <h3 style={progressTitleStyle}>Completion Rate</h3>
        <div style={progressBackgroundStyle}>
          <div 
            style={{
              ...progressBarStyle,
              width: `${stats.completionRate}%`,
              background: `linear-gradient(90deg, #3b82f6 0%, #60a5fa ${stats.completionRate}%)`,
            }}
          ></div>
        </div>
        <p style={progressTextStyle}>{stats.completionRate.toFixed(1)}%</p>
      </div>
      
      {/* Charts */}
      <div style={chartsGridStyle}>
        {/* Status Distribution */}
        <div style={chartContainerStyle}>
          <h3 style={chartTitleStyle}>Status Distribution</h3>
          {stats.total > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  animationBegin={0}
                  animationDuration={1200}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} tasks`, 'Count']} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={noDataStyle as React.CSSProperties}>No data available</div>
          )}
        </div>
        
        {/* Priority Distribution */}
        <div style={chartContainerStyle}>
          <h3 style={chartTitleStyle}>Tasks by Priority</h3>
          {stats.total > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fill: '#64748b' }} />
                <YAxis tick={{ fill: '#64748b' }} />
                <Tooltip 
                  formatter={(value) => [`${value} tasks`, 'Count']}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  wrapperStyle={{ paddingTop: '10px' }}
                />
                <Bar 
                  dataKey="value" 
                  name="Tasks" 
                  radius={[4, 4, 0, 0]}
                  animationBegin={0}
                  animationDuration={1200}
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={noDataStyle}>No data available</div>
          )}
        </div>
        
        {/* Category Distribution */}
        {categoryData.length > 0 && (
          <div style={fullWidthChartStyle}>
            <h3 style={chartTitleStyle}>Tasks by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#64748b' }}
                  tickLine={{ stroke: '#cbd5e1' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis 
                  tick={{ fill: '#64748b' }}
                  tickLine={{ stroke: '#cbd5e1' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} tasks`, 'Count']}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  wrapperStyle={{ paddingTop: '10px' }}
                />
                <Bar 
                  dataKey="value" 
                  name="Tasks" 
                  radius={[4, 4, 0, 0]}
                  animationBegin={0}
                  animationDuration={1200}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;