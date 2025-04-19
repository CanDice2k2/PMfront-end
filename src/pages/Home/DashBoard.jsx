import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "@/redux/Project/Project.Action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// You'll need to install these dependencies:
// npm install chart.js react-chartjs-2
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { project, auth } = useSelector((store) => store);
  const [projectStats, setProjectStats] = useState({
    total: 0,
    byCategory: {},
    byStatus: {
      pending: 0,
      in_progress: 0,
      done: 0
    }
  });

  useEffect(() => {
    dispatch(fetchProjects({}));
  }, [dispatch, auth.jwt]);

  useEffect(() => {
    if (project.projects.length > 0) {
      const categoryData = {
        "nha_o": 0,
        "cong_nghiep": 0,
        "thuong_mai": 0,
        "other": 0
      };

      // Khởi tạo đối tượng đếm trạng thái
      const statusData = {
        pending: 0,
        in_progress: 0,
        done: 0
      };

      // Đếm dự án theo danh mục và trạng thái
      project.projects.forEach(item => {
        // Đếm theo danh mục
        if (item.category && categoryData[item.category] !== undefined) {
          categoryData[item.category]++;
        } else {
          categoryData.other++;
        }

        // Đếm theo trạng thái
        if (item.status && statusData[item.status] !== undefined) {
          statusData[item.status]++;
        } else {
          // Nếu không có trạng thái, mặc định là pending
          statusData.pending++;
        }
      });

      setProjectStats({
        total: project.projects.length,
        byCategory: categoryData,
        byStatus: statusData
      });
    }
  }, [project.projects]);

  // Chart data for categories
  const pieChartData = {
    labels: [
      'Công trình nhà ở', 
      'Công trình công nghiệp', 
      'Công trình thương mại',
      'Khác'
    ],
    datasets: [
      {
        data: [
          projectStats.byCategory.nha_o, 
          projectStats.byCategory.cong_nghiep, 
          projectStats.byCategory.thuong_mai,
          projectStats.byCategory.other
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart data for status - Cập nhật theo trạng thái thực tế
  const statusChartData = {
    labels: ['Chờ xử lý', 'Đang tiến hành', 'Hoàn thành'],
    datasets: [
      {
        label: 'Số lượng dự án',
        data: [
          projectStats.byStatus.pending, 
          projectStats.byStatus.in_progress, 
          projectStats.byStatus.done
        ],
        backgroundColor: [
          'rgba(255, 159, 64, 0.6)', // Màu cam cho pending
          'rgba(54, 162, 235, 0.6)', // Màu xanh dương cho in_progress
          'rgba(75, 192, 192, 0.6)'  // Màu xanh lá cho done
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Bảng điều khiển</h1>
        <Button onClick={() => navigate("/projects")}>Xem tất cả dự án</Button>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tổng số dự án
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{projectStats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Dự án đang tiến hành
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{projectStats.byStatus.in_progress}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Dự án đã hoàn thành
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{projectStats.byStatus.done}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Phân loại dự án theo danh mục</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div style={{ height: '300px', width: '300px' }}>
              <Pie 
                data={pieChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  }
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trạng thái dự án</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar 
              data={statusChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      precision: 0
                    }
                  }
                }
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent projects section */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Dự án gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.projects.slice(0, 5).map((item) => (
                <div 
                  key={item.id} 
                  className="flex justify-between items-center p-3 border rounded-md hover:bg-slate-50 cursor-pointer"
                  onClick={() => navigate(`/project/${item.id}`)}
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.category ? 
                        item.category === "nha_o" ? "Công trình nhà ở" : 
                        item.category === "cong_nghiep" ? "Công trình công nghiệp" : 
                        "Công trình thương mại" : "Chưa phân loại"}
                    </p>
                  </div>
                  <div className="text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
            
            {project.projects.length > 5 && (
              <div className="mt-4 text-center">
                <Button variant="outline" onClick={() => navigate("/")}>
                  Xem tất cả
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;