'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const Cube = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cube = new THREE.Mesh();

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      30,
      (window.innerWidth - 100) / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    if (mountRef.current) {
      // Adjust this to fit the hero section specifically
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      mountRef.current.appendChild(renderer.domElement);
    }

    // Function to create a texture with a purple background for an image
    const createTextureWithBackground = (
      imageUrl: string,
      callback: (texture: THREE.Texture) => void,
      padding: number = 30 // Default padding of 20 pixels
    ) => {
      const loader = new THREE.ImageLoader();
      loader.load(imageUrl, (image) => {
        const canvas = document.createElement('canvas');
        canvas.width = 300; // Set as needed
        canvas.height = 300; // Set as needed
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Draw purple background
          ctx.fillStyle = '#0d071d'; // Purple color
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Calculate the size and position for the image with padding
          const paddedWidth = canvas.width - padding * 2;
          const paddedHeight = canvas.height - padding * 2;
          const offsetX = padding;
          const offsetY = padding;

          // Draw the image on top
          ctx.drawImage(image, offsetX, offsetY, paddedWidth, paddedHeight);
        }

        const texture = new THREE.CanvasTexture(canvas);
        callback(texture);
      });
    };

    // Load and apply textures with backgrounds
    const imageUrls = [
      '/images/skills/nextjs.svg',
      '/images/skills/tailwind-css.svg',
      '/images/skills/typescript.svg',
      '/images/skills/react.svg',
      '/images/luna-logo.png',
      '/images/skills/javascript.svg',
    ];

    const textures: any[] = [];
    let loaded = 0;
    console.log('loaded', loaded);
    imageUrls.forEach((url, index) => {
      createTextureWithBackground(url, (texture) => {
        textures[index] = new THREE.MeshBasicMaterial({ map: texture });
        loaded++;
        if (loaded === imageUrls.length) {
          // All textures are loaded, create and add the cube to the scene
          const geometry = new THREE.BoxGeometry();

          cube = new THREE.Mesh(geometry, textures);
          scene.add(cube);

          // Calculate the edges of the cube
          const edges = new THREE.EdgesGeometry(cube.geometry);
          // Define the line material
          const lineMaterial = new THREE.LineBasicMaterial({
            color: '#CACDED',
          });
          // Create line segments to render the outline
          const cubeEdges = new THREE.LineSegments(edges, lineMaterial);

          // Add the edges to the scene
          cube.add(cubeEdges);
        }
      });
    });

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;

    // Electrons
    const electronMaterial = new THREE.MeshBasicMaterial({
      color: '#CACDED', // Random color for each electron
    });
    const electronGeometry = new THREE.SphereGeometry(0.1, 32, 32); // Small sphere for electron
    const electrons: THREE.Mesh<
      THREE.SphereGeometry,
      THREE.MeshBasicMaterial,
      THREE.Object3DEventMap
    >[] = [];
    const electronDistance = 1; // Distance from the center of the cube

    // Create 4 electrons
    for (let i = 0; i < 4; i++) {
      const electron = new THREE.Mesh(electronGeometry, electronMaterial);
      electrons.push(electron);
      scene.add(electron);
    }

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate Cube
      cube.rotation.x += 0.007;
      cube.rotation.y += 0.007;
      // cube.rotation.z += 0.007;

      // Animate Electrons
      const time = Date.now() * 0.001; // Base time component for orbital movement
      electrons.forEach((electron, index) => {
        const angleXZ = time + index * (Math.PI / 2); // Controls movement in the XZ plane
        const angleYZ = time + index * (Math.PI / 4); // Controls movement in the YZ plane
        // Calculate orbital positions
        const angle = time + index * (Math.PI / 2); // Offset each electron to start at different positions
        electron.position.x =
          cube.position.x + electronDistance * Math.sin(angleXZ);
        electron.position.y =
          cube.position.y + electronDistance * Math.cos(angleYZ);
        electron.position.z =
          cube.position.z + electronDistance * Math.sin(time + index);
        // Math.sin(time + index) * electronDistance;
      });
      controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
      renderer.render(scene, camera);
    };

    const handleWindowResize = () => {
      if (mountRef.current) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        // Update camera and renderer
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);

        // Adjust camera position based on new aspect ratio
        // This is a simple heuristic and might need tweaking
        const scaleFactor = height / width;
        camera.position.z = scaleFactor * 8;
      }
    };

    window.addEventListener('resize', handleWindowResize);

    animate();

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }

      window.removeEventListener('resize', handleWindowResize);

      controls.dispose();
    };
  }, []);

  return (
    <div
      className="w-full overflow-hidden h-full cursor-pointer"
      ref={mountRef}
    />
  );
};

export default Cube;
